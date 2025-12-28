import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.originalUrl.includes('/payments/webhook')) {
            json({
                verify: (req: any, res, buf) => {
                    if (Buffer.isBuffer(buf)) {
                        req.rawBody = Buffer.from(buf);
                    }
                    return true;
                },
            })(req, res, next);
        } else {
            next();
        }
    }
}