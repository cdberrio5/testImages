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
                    const filePath = path.join(__dirname, '..', 'public', fileName);
                    const serverPath = process.env.URI + ":" + process.env.PORT + "/public/" + fileName;
                    
                    await fs.writeFileSync(filePath, convertedBuffer);

                    const username = req.body.name;

                    const image = new ImageSchema({
                        insertedBy: username,
                        path: serverPath
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

    public async getImages(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, startDate, endDate } = req.query;
            const itemsPerPage = 10;
            const pageNumber = parseInt(page as string, 10) || 1;

            const query: any = {};

            if (startDate && endDate) {
                query.createdAt = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
            }

            const totalItems = await ImageSchema.countDocuments(query);
            const totalPages = Math.ceil(totalItems / itemsPerPage);

            const images = await ImageSchema.find(query)
                .sort({ createdAt: 'desc' })
                .skip((pageNumber - 1) * itemsPerPage)
                .limit(itemsPerPage);

            res.status(200).json({
                totalPages,
                currentPage: pageNumber,
                data: images,
            });

        } catch (error) {
            return res.send(500).json({ error })
        }
    }
}

export default PhotoController;
