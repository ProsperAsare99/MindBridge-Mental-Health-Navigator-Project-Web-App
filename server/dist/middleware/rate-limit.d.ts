import { Request, Response, NextFunction } from 'express';
export declare const generalLimiter: (req: Request, res: Response, next: NextFunction) => void;
export declare const aiChatLimiter: (req: Request, res: Response, next: NextFunction) => void;
export declare const loginLimiter: (req: Request, res: Response, next: NextFunction) => void;
export declare const rateLimiter: (req: Request, res: Response, next: NextFunction) => void;
export default rateLimiter;
