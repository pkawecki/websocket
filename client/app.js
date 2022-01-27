const loginForm = document.querySelector("#welcome-form");
const messageSection = document.querySelector("#messages-section");
const messagesList = document.querySelector("#messages-list");
const addMessageForm = document.querySelector("#add-messages-form");
const userNameInput = document.querySelector("#username");
const messageContentInput = document.querySelector("#message-content");

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

const sendMessage = () => {
  event.preventDefault();
  if (!messageContentInput.value) {
    messageContentInput.placeholder = "Type something FFS !";
  } else {
    addMessage(userName, messageContentInput.value);
  }
};

const login = () => {
  console.log("joined");
  console.log("name", username.value);
  userName = username.value;
  loginForm.classList.remove("show");
  messageSection.classList.add("show");
  event.preventDefault();
};

loginForm.addEventListener("submit", login);
addMessageForm.addEventListener("submit", sendMessage);
