import express from "express";
import { RedisCacheManager } from "./services/cacheManager";
import dotenv from 'dotenv';
import { Routes } from './routes/routes';
import { SocketService } from './services/socketService';

dotenv.config();

const redisUrl = "redis://localhost:6379";
const cacheManager = new RedisCacheManager(redisUrl);

const app: express.Application = express();
const port = 3000;

// Check Note.md for more redis details & Commands
// Example Docker-compose file `docker-compose.yml`

// Services

const server = app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

const socketService = new SocketService(server);

// Routes
const allRoutes = new Routes(
  app,
  cacheManager,
  socketService,
);

allRoutes.init();
