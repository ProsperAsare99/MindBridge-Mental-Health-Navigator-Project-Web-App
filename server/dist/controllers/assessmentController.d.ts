import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.js';
export declare const createAssessment: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserAssessments: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
