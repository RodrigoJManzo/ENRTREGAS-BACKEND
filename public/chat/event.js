import { ChatMongo } from "../../src/Dao/chat/chatMongo.js"

const chatMongo = new ChatMongo();

const socketEvent = (io) => {
  io.on("connection", async (socket) => {
    const messages = await chatMongo.getAll();
    io.sockets.emit("messages", messages);

    socket.on("chat", async (chat) => {
      await chatMongo.save(chat);
      const updatedMessages = await chatMongo.getAll();
      io.sockets.emit("messages", updatedMessages);
    });
  });
};

export { socketEvent };