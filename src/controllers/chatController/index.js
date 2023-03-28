
/**
 * 
 * @param {user.coockies.email, that comes from LogIn } req 
 * @param {renders chat.handlebars and passes the object with the user name} res 
 */

const renderChat = async (req, res) => {
    res.render("chat", { email: req.user.email })
}
export {
  renderChat
}