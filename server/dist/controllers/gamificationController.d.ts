import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getGamificationStats: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getChallenges: (req: AuthRequest, res: Response) => Promise<void>;
export declare const joinChallenge: (req: AuthRequest, res: Response) => Promise<void>;
