import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import imageRoutes from './routes/images';

dotenv.config();

class App {
  private app: Application;
  private readonly PORT: number;

  constructor(port: number) {
    this.app = express();
    this.PORT = port;

    // Configura middlewares y rutas al inicializar la aplicación
    this.initializeMiddlewares();
    this.initializeRoutes();

    // Conecta a la base de datos MongoDB
    this.connectToDatabase();
  }

  private initializeMiddlewares(): void {
    // Middleware para permitir solicitudes desde todos los dominios
    this.app.use(cors());

    // Middleware para analizar el cuerpo de las solicitudes como JSON
    this.app.use(express.json());

    // Middleware para manejar errores
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something went wrong!');
    });
  }

  private initializeRoutes(): void {
    this.app.use('/api', imageRoutes);
  }

  private connectToDatabase(): void {
    const mongoURI = process.env.MONGO_URI;
        
    mongoose.connect(mongoURI!)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('Error connecting to MongoDB', err));
  }

  public startServer(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

// Obtiene el puerto del entorno, o utiliza el puerto 3000 por defecto
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Crea una instancia de la clase App y la inicia
const server = new App(port);
server.startServer(3000);