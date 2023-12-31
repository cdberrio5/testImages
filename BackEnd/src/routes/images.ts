import { Router } from 'express';
import multer from 'multer';
import ImageController from '../controllers/imagesController';
import ImageMiddlewares from '../middlewares/imageMiddleware';

class ImageRoutes {
  private router: Router;
  private imageController: ImageController;
  private storage: any;
  private upload: any;
  private imageMiddleware: ImageMiddlewares;

  constructor() {
    this.router = Router();
    this.imageController = new ImageController();
    this.storage = multer.memoryStorage();
    this.upload = multer({ storage: this.storage, dest: '/public' });
    this.imageMiddleware = new ImageMiddlewares();

    this.router.post('/images', this.upload.array('images'), this.imageMiddleware.validateFiles, this.imageController.uploadImages)
    this.router.get("/images", this.imageController.getImages)
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new ImageRoutes().getRouter();