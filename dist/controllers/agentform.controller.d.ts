import { Request, Response } from "express";
interface MulterRequest extends Request {
    file?: Express.Multer.File & {
        path: string;
    };
}
export declare const agentFormController: {
    getAgents(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAgentById(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyAgent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    createAgent(req: MulterRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    updateAgent(req: MulterRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteAgent(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
};
export {};
