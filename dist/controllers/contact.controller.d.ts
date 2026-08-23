import { Request, Response } from "express";
export declare const ContactController: {
    create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    getAll(req: Request, res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateStatus(req: Request, res: Response): Promise<void>;
    remove(req: Request, res: Response): Promise<void>;
};
