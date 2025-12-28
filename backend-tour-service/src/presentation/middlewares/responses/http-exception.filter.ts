import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception instanceof HttpException
            ? exception.getResponse()
            : null;

        const message = typeof exceptionResponse === 'object' && exceptionResponse !== null
            ? (exceptionResponse as any).message || (exceptionResponse as any).error
            : exception.message || 'Lỗi hệ thống không xác định';

        response.status(status).json({
            success: false,
            statusCode: status,
            message: Array.isArray(message) ? message[0] : message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}