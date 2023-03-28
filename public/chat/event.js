import { ChatMongo } from "../../src/Dao/chat/chatMongo.js"

const chatMongo = new ChatMongo
const messages = await chatMongo.getAll()

export const socketEvent = (io) =>{
    io.on('connection', socket =>{
      io.sockets.emit('messages', messages)
      socket.on('chat', async chat =>{
        const messasge = ChatMongo.save(chat)
        const uptatedMessages = await ChatMongo.getAll()
        io.sockets.emit('messages', uptatedMessages)
      })
    })
  }
  