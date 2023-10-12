import { NextFunction, Request, Response } from "express";

class ImageMiddlewares {
    public async validateFiles(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body;

            if(!Boolean(name)) {
                return res.status(400).json({ error: "The name are required" })
            }

            if(!req.files || req.files.length == 0) {
                return res.status(400).json({ error: "The images are required" })
            }

            next();
        } catch (error: any) {
            return res.status(500).json({ error })
        }
    }
}

export default ImageMiddlewares;