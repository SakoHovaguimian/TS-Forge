import bodyParser from "body-parser";
import { Application } from "express";
import useragent from 'express-useragent';
import cors from 'cors';
import { RedisCacheManager } from "../services/cacheManager";
import { setupSocketRoutes } from "./socketRoutes";
import { setupCacheRoutes } from "./cacheRoutes";
import { SocketService } from "../services/socketService";

export class Routes {

    private app: Application;
    private redisCacheManager: RedisCacheManager;
    private socketService: SocketService;

    constructor(
        app: Application,
        redisCacheManager: RedisCacheManager,
        socketService: SocketService,
        ) {

        this.app = app;
        this.redisCacheManager = redisCacheManager;
        this.socketService = socketService;

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

    }

}
