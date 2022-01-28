const loginForm = document.querySelector("#welcome-form");
const messageSection = document.querySelector("#messages-section");
const messagesList = document.querySelector("#messages-list");
const addMessageForm = document.querySelector("#add-messages-form");
const userNameInput = document.querySelector("#username");
const messageContentInput = document.querySelector("#message-content");
const socket = io();

let userName = "";

const addMessage = (userNamePassed, userInput) => {
  //   console.log("user: ", userName, "input:", userInput);
  //   console.log(messagesList);
  if (messagesList.childElementCount) {
    messagesList.childNodes[
      messagesList.childElementCount - 1
    ].classList.remove("message--received");
  }

  let author,
    classes = "";
  if (userNamePassed == userName) {
    author = "You";
    classes = "message message--self message--received";
  } else {
    author = userNamePassed;
    classes = "message message--received";
  }
  let listElement = `<li class='${classes}'>
  <h3 class='message__author'>${author}</h3>
  <div class='message__content'>${userInput}</div>
</li>`;
  messagesList.innerHTML += listElement;
};

const addGeneralMessage = (type, user) => {
  let input = "";
  if (type == "join") {
    input = `${user} has joined`;
  } else if (type == "left") {
    input = `${user} has left`;
  }
  let listElement = `<li class='message message--received'>
  <h3 class='message__author'>Chatbot</h3>
  <div class=' message__chatbot message__content'>${input}</div>
  </li>`;

  messagesList.innerHTML += listElement;
};

const sendMessage = () => {
  event.preventDefault();
  let msgCont = messageContentInput.value;
  if (!messageContentInput.value) {
    messageContentInput.placeholder = "Type something FFS !";
  } else {
    addMessage(userName, msgCont);
    socket.emit("message", { author: userName, content: msgCont });
  }
};

const login = () => {
  console.log("joined");
  console.log("name", username.value);
  userName = username.value;
  loginForm.classList.remove("show");
  messageSection.classList.add("show");
  socket.emit("loginEvent", { login: userName });
  event.preventDefault();
};

socket.on("message", ({ author, content }) => addMessage(author, content));
socket.on("generalMsg", ({ type, user }) => addGeneralMessage(type, user));

loginForm.addEventListener("submit", login);
addMessageForm.addEventListener("submit", sendMessage);
