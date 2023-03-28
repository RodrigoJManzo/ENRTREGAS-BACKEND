import { io } from "socket.io-client"

const socket = io('http://localhost:8080/chat')

//Chat 

const chatForm = document.getElementById(`message-form`)
const chatContainer = document.getElementById(`messages`)

/
//Escucho el fomulario de mensajes y tomo sus datos
//Emito los datos a mensaje Nuevo
chatForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const data = new FormData(chatForm)
    const values = Object.fromEntries(data)
    chatForm.reset()
    socket.emit(`mensajeNuevo`, values)
    console.log(`Datos de Productos Recibidos`, values)
} )

//Esucho en todos los mensajes
socket.on(`todosMensajes`, allMsg =>{
    muestraMensajes(allMsg)
})

//Renderizo los mensajes con la informacion obtenida del JSON y el template
const muestraMensajes = async (messages) =>{
    const res = await fetch ("../src/views/chat.handlebars")
    const template = await res.text()
    const compiled = Handlebars.compile(template)
    const html = compiled({messages})
    chatContainer.innerHTML = html
    chatContainer.scrollTop = chatContainer.offsetHeight
}