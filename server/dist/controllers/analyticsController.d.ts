import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
export declare const getUserAnalytics: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMoodInsight: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getActivityFeed: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logActivity: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getRecommendations: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
