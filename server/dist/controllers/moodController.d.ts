import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const createMood: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserMoods: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMoodStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
