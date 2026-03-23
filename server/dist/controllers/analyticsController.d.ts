import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getUserAnalytics: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMoodInsight: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
