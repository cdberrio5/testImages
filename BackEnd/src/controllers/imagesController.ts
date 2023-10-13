import { NextFunction, Request, Response } from "express-serve-static-core";
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ImageSchema from './../models/images';

class PhotoController {
    public async uploadImages(req: Request, res: Response, next: NextFunction) {
        try {

            if(!req.files) {
                return; 
            }

            const uploadPromises: Promise<string>[] = [];

            const files = req.files as Express.Multer.File[];

            files.map(async (file: Express.Multer.File) => {
                try {

                    const optimizedBuffer = await sharp(file.buffer)
                        .webp({ quality: 80 })
                        .toBuffer();

                    const convertedBuffer = await sharp(optimizedBuffer)
                        .png()
                        .toBuffer();

                    const fileName = `${Date.now()}.png`;                    
                    const filePath = path.join(__dirname, '..', 'uploads', fileName);
                    
                    await fs.writeFileSync(filePath, convertedBuffer);

                    const username = req.body.name;

                    const image = new ImageSchema({
                        insertedBy: username,
                        path: filePath
                    });

                    await image.save();

                    uploadPromises.push(Promise.resolve(filePath));
                } catch (error) {
                    uploadPromises.push(Promise.reject(error));
                }
            })

            const uploadedImages = await Promise.all(uploadPromises);

            return res.status(200).json({ message: 'Images uploaded successfully', uploadedImages });
        } catch (error: any) {
            return res.send(500).json({ error })
        }
    }
}

export default PhotoController;
