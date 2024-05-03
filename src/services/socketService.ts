import { Server, Socket } from 'socket.io';

// CHECK OUT TRAVERSY MEDIA FOR MORE INFO ON SOCKET.IO
// https://www.youtube.com/watch?v=jD7FnbI76Hg
// github: https://github.com/bradtraversy/chatcord/blob/master/server.js

// Dev-Notes:
// 1. A lot of this was test code and not production code.
// 2. In a production environment, we would have access to the user and wouldn't need the local property `currentUser`.
// 3. We would also have a database to know the users in the room which means we wouldn't need the local property `roomUserDictionary`.
// 4. We would need methods exposed to endpoints to emit events to the client when the needs are met.

const roomUserDictionary: { [room: string]: string[] } = {};

class Message {
  message: string;
  username: string;
  type: string;
  private timestamp: Date;

  formattedTimestamp(): string {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(this.timestamp);
  }

  constructor(message: string, username: string, type: string = "user-message", timestamp: Date = new Date()) {
    this.message = message;
    this.username = username;
    this.type = type;
    this.timestamp = timestamp;
  }
}

enum EventType {
  WELCOME = 'welcome',
  RECEIVE_MESSAGE = 'receive-message',
  JOIN_ROOM = 'join-room',
  LEAVE_ROOM = 'leave-room',
  USERS_IN_ROOM = 'users-in-room',
  TYPING = 'typing',
  DISCONNECT = 'disconnect',
  INTERNAL_SEND_MESSAGE = 'send-message',
}

export class SocketService {
  readonly io: Server;

  currentUser: string | null = null;

  constructor(server: any) {
    this.io = new Server(server);
    this.io.on('connection', this.handleConnection);
  }

  private handleConnection = (socket: Socket) => {

    console.log('client connected to socketIO connection');

    const welcomeMessage = new Message('Welcome to the chat!', 'ChatBot');
    socket.emit(EventType.WELCOME, welcomeMessage);

    // Handle 'disconnect' event, notifying the server when a client disconnects
    // When a client disconnects, this event is triggered.
    socket.on(EventType.DISCONNECT, () => {
      console.log('client disconnected');
    });

    // Handle 'send-message' event, broadcasting messages to the room
    // When a client sends a message, this event is triggered.
    // The message and username are received from the client.
    socket.on(EventType.INTERNAL_SEND_MESSAGE, ({ message, username }, room) => {

      // Prevent users from sending messages if they are not in the room.

      if (!roomUserDictionary[room]) {
        roomUserDictionary[room] = [];
      }

      if (roomUserDictionary[room].includes(username)) {

        // socket.to(room) sends the message to all clients in the specified room except the sender.
        const newMessage = new Message(message, username);
        socket.to(room).emit(EventType.RECEIVE_MESSAGE, newMessage);

      }

    });

    // Handle 'typing' event, notifying the room when a client is typing
    // When a client is typing, this event is triggered.
    socket.on(EventType.TYPING, (username: string, room: string) => {
      socket.to(room).emit(EventType.TYPING, username);
    });

    // Handle 'join-room' event, allowing clients to join specific rooms
    // When a client wants to join a specific room, this event is triggered.
    // The client is added to the room, and they can now send and receive messages within that room.
    socket.on(EventType.JOIN_ROOM, (username: string, room: string) => {
      // We should add user data here; look at the example below
      // socket.data = { username: 'user' }

      socket.data = { username: username };
      this.currentUser = username;
      socket.join(room);

      if (!roomUserDictionary[room]) {
        roomUserDictionary[room] = [];
      }

      if (!roomUserDictionary[room].includes(username)) {

        roomUserDictionary[room].push(username);

        const newRoomCount = roomUserDictionary[room].length;
        const newMessage = new Message(`Someone has joined the chat, new room count is ${newRoomCount}`, "ChatBot", "chatbot-message");
        socket.in(room).emit(EventType.RECEIVE_MESSAGE, newMessage);

        const usersInRoom = roomUserDictionary[room];
        socket.in(room).emit(EventType.USERS_IN_ROOM, usersInRoom);

      }

    });

    // Handle 'leave-room' event, allowing clients to leave specific rooms
    // When a client wants to leave a specific room, this event is triggered.
    socket.on(EventType.LEAVE_ROOM, (room) => {

      socket.leave(room);

      if (!roomUserDictionary[room]) {
        console.log('No users in room');
        return;
      }

      roomUserDictionary[room] = roomUserDictionary[room].filter(user => user !== this.currentUser);

      const newRoomCount = roomUserDictionary[room].length;
      const newMessage = new Message(`Someone has left the chat, new room count is ${newRoomCount}`, "ChatBot", "chatbot-message");
      socket.in(room).emit(EventType.RECEIVE_MESSAGE, newMessage);

      const usersInRoom = roomUserDictionary[room];
      socket.in(room).emit(EventType.USERS_IN_ROOM, usersInRoom);

    });

  };

}
