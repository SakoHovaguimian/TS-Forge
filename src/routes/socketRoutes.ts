import { Application, Request, Response } from "express";
import { SocketService } from "../services/socketService";

export function setupSocketRoutes(app: Application, socketService: SocketService) {

    app.get("/chat", async (req: Request, res: Response) => {
        res.send("Chat");
    });

    app.post("/chat/join", async (req: Request, res: Response) => {

        const { room_id } = req.body;

        socketService.io.sockets.emit('join-room', room_id);
        res.send("Joined room");

    });

}
