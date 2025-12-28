import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception.message || 'Unknown system error';
        
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'object' ? (res as any).message : res;
        }

        else if (exception.name === 'DomainException') {
            status = HttpStatus.BAD_REQUEST;
        }

        response.status(status).json({
            success: false,
            statusCode: status,
            message: Array.isArray(message) ? message[0] : message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}