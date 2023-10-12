import ImageSchema from '../models/images';


class ImageService {

    public async insertImages(photoPaths: string[]) {
        const photos = photoPaths.map((path: string) => ({ path }));
        return ImageSchema.insertMany(photos);
    }
}

export default new ImageService();