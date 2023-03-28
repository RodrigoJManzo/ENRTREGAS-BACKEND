import io from 'socket.io-client'

const socket = io("http://localhost:3000");

const chatForm = document.getElementById("message-form");
const chatContainer = document.getElementById("messages");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(chatForm);
  const values = Object.fromEntries(data);
  chatForm.reset();
  socket.emit("chat", values);
});

socket.on("messages", (allMsg) => {
  showMessages(allMsg);
});

const showMessages = (messages) => {
  chatContainer.innerHTML = "";
  messages.forEach((message) => {
    const div = document.createElement("div");
    div.textContent = `${message.author}: ${message.text}`;
    chatContainer.appendChild(div);
  });
};