import rateLimit from 'express-rate-limit';
import validateToken from '@nina/controller/validateToken';

const allowList = [Bun.env.ALLOW_IP, Bun.env.ALLOW_TOKEN];
const allowPath = ['/admin'];

export default (limit: number = 10) => {
    return rateLimit({
        windowMs: seconds(1),
        limit: validateToken(limit),
        skipFailedRequests: true,
        statusCode: 429,
        message: {
            error: {
                code: 429,
                message: 'rate.limit'
            }
        },
        keyGenerator: (req): string => req.headers['x-nina-token'] as string || localhost(req.ip),
        skip: (req): boolean => {
            if (allowPath.includes(req.path)) return true;
            if (allowList.includes(req.headers['x-nina-token'] as string || localhost(req.ip))) return true;
            return false;
        },
    })
}

function localhost(ip: string | undefined): string {
    return ip?.replace('::ffff:', '') || '127.0.0.1';
}

function seconds(s: number): number {
    return s * 1000
}