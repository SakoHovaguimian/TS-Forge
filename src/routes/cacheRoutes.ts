import { Application, Request, Response } from "express";
import { RedisCacheManager } from "../services/cacheManager";

export function setupCacheRoutes(app: Application, redisCacheManager: RedisCacheManager) {
  app.get("/", async (req: Request, res: Response) => {

    try {

      const cachedValue = await redisCacheManager.get("test");

      if (cachedValue) {
        return res.send(cachedValue);
      } else {
        res.send("No Value Found in Cache");
      }

    } catch (error) {

      console.error("Error retrieving data from cache:", error);
      res.status(500).send("Internal Server Error");

    }

  });

  app.get("/cache", async (req: Request, res: Response) => {

    try {

      await redisCacheManager.set("test", "SOME VALUE", 3600);
      res.send("Cached");

    } catch (error) {

      console.error("Error caching data:", error);
      res.status(500).send("Internal Server Error");

    }

  });
}
