import { io } from "socket.io-client";
const ENDPOINT = "http://localhost:8080";

let socket;
export const initiateSocket = (room, username) => {
  socket = io(ENDPOINT);
  console.log("Connecting socket ...");
  if (socket && room) {
    socket.emit("join_room", { username, room });
  }
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket ...");
  if (socket) {
    socket.disconnect();
  }
};

export const subscribeToChat = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on("message", (msg) => {
    console.log("Web Message Received");
    return cb(null, msg);
  });
};

export const subscribeToQuiz = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on("quiz_start", (val) => {
    console.log("Quiz Starting");
    return cb(null, val);
  });
};
export const subscribeToQuestions = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on("question", (val) => {
    console.log("Question received");
    return cb(null, val);
  });
};
export const subscribeToFeedback = (cb) => {
  if (!socket) {
    return true;
  }
  socket.on("feedback", (msg) => {
    console.log("Feedback Received");
    return cb(null, msg);
  });
};

export const sendMessage = (sender, message, room) => {
  if (socket) {
    socket.emit("chatMessage", { sender, message, room });
  }
};

export const sendFeedback = (value, room) => {
  if (socket) {
    socket.emit("teacher_feedback", {message: value, room});
  }
};

export const sendStartQuiz = ( room) => {
  if (socket) {
    socket.emit("start_quiz", {room});
  }
};
export const sendNextQuestion = (room) => {
  if (socket) {
    socket.emit("next_question", {room});
  }
};