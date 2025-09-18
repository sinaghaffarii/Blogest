import express, { Application } from 'express';
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import Database from './configs/db';
import authRoutes from './routes/auth.routes';
import { swaggerUi, swaggerDocument } from './configs/swagger';

class Server {
  private app: Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private async initializeDatabase(): Promise<void> {
    await Database.connect();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(morgan('dev'));
    this.app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
      }),
    );
    // this.app.use(sanitizeMiddleware);
  }

  private initializeRoutes(): void {
    this.app.use('/api/auth', authRoutes);
    this.app.get('/', (req, res) => res.send('API is running ✅'));
  }

  private initializeSwagger(): void {
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
  }

  private initializeErrorHandling(): void {
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
      },
    );
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
