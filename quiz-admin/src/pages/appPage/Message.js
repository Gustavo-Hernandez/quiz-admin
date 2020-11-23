import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "90%",
    wordWrap: "break-word",
    padding: "3px 0",
    borderRadius: "8px",
    marginBottom: "5px",
  },
  serverMessage: {
    backgroundColor: "#1976D2",
    color: "white",
    textAlign: "center",
    fontSize: "0.9rem",
    fontWeight: "bolder",
  },
  userMessage: {
    backgroundColor: "#E1F5FE",
  },
  ownMessage:{
      backgroundColor:"#E0F2F1",
      textAlign:"right",
  },
  sender: {
    fontWeight: "bolder",
    fontSize: "0.8rem",
  },
  message: {
    paddingLeft: "5px",
    fontSize: "0.9rem",
  },
}));

const Message = ({ sender, message, username }) => {
  const classes = useStyles();
  return sender === "server" ? (
    <div className={`${classes.root} ${classes.serverMessage}`}>{message}</div>
  ) : username === sender ? (
    <div className={`${classes.root} ${classes.ownMessage}`}>
      <div className={classes.sender}>{sender}</div>
      <div className={classes.message}>{message}</div>
    </div>
  ) : (
    <div className={`${classes.root} ${classes.userMessage}`}>
      <div className={classes.sender}>{sender}</div>
      <div className={classes.message}>{message}</div>
    </div>
  );
};
export default Message;
