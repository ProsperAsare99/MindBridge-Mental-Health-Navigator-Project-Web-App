import { Request, Response, NextFunction } from 'express';
export declare const getJwtSecret: () => string;
export interface AuthRequest extends Request {
    user?: any;
    userId?: string;
}
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
