import bodyParser from "body-parser";
import { Application } from "express";
import useragent from 'express-useragent';
import cors from 'cors';
import { RedisCacheManager } from "../services/cacheManager";
import { setupSocketRoutes } from "./socketRoutes";
import { setupCacheRoutes } from "./cacheRoutes";
import { SocketService } from "../services/socketService";
import { NotificationManager } from "../services/notificationManager";
import { setupNotificationRoutes } from "./notificationRoutes";

export class Routes {

    private app: Application;
    private redisCacheManager: RedisCacheManager;
    private socketService: SocketService;
    private notificationManager: NotificationManager;

    constructor(
        app: Application,
        redisCacheManager: RedisCacheManager,
        socketService: SocketService,
        notificationManager: NotificationManager,
        ) {

        this.app = app;
        this.redisCacheManager = redisCacheManager;
        this.socketService = socketService;
        this.notificationManager = notificationManager;

    }

    init() {

        // CORS
        this.app.use(cors());

        // DATA MASSAGING
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );

        // USER AGENT
        this.app.use(useragent.express());

        // ROUTES

        setupCacheRoutes(this.app, this.redisCacheManager);
        setupSocketRoutes(this.app, this.socketService);
        setupNotificationRoutes(this.app, this.notificationManager);

    }

}
