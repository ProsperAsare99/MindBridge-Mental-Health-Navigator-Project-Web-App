import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const chatWithOracle: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getChatHistory: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
