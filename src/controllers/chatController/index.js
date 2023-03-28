import { ChatMongo } from "../../Dao/chat/chatMongo.js";

const renderChat = async (req, res) => {
    res.render("chat", { email: req.user.email })
}


const getChat = async  (req, res) => {
  
  // Get the 10 most recent chat messages

  const chats = await ChatMongo.getAll()
    .sort({ createdAt: -1 })
    .limit(10)
    .sort({ createdAt: 1 });

  res.render("chat", { user: req.user, chats });
};

// Add a new route for logging out
const logOut =  (req, res) => {
  req.logout();
  res.redirect("/api/auth/login");
};

export {
    getChat,
    logOut,
    renderChat
}