import  io  from "../.."
const socket = io("http://localhost:3000")

const chatForm = document.getElementById('message-form')
const chatContainer = document.getElementById('messages')

chatForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const data =  new FormData(chatForm)
  const values = Object.fromEntries(data)
  chatForm.reset()
  socket.emit('message', values)
  ChatMongo.save(values)
})

socket.on('messages', allMsg => {showMessages(allMsg)})

const showMessages = async (messages) =>{
  const res = await ChatModel.getAll()
  const template = await res.message
  const compiled = Handlebars.compile(template)
  const html = compiled({messages})
  chatContainer.innerHTML = html
  chatContainer.scrollTop = chatContainer.offsetHeight
}