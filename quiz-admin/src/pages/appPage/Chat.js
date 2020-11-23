import React, { useState } from "react";
import {
  Card,
  TextField,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  CardHeader,
  Divider,
} from "@material-ui/core";
import Message from "./Message";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#0093E9",
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    color: "white",
  },
  messageContainer: {
    flex: "1 1 auto",
    height: "250px",
    width: "300px",
    overflowY:"scroll",
  },
  actionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
}));

const Chat = ({ messages, sendChatMessage, username }) => {
  const classes = useStyles();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim().length > 0) {
      sendChatMessage(input);
      setInput("");
    }

  };

  const messagesComponent = messages.map((message, index) => (
    <Message key={index} {...message} username={username}/>
  ));

  return (
    <Card>
      <CardHeader title="Chat" className={classes.header} />
      <CardContent className={classes.messageContainer}>
        {messagesComponent}
      </CardContent>
      <Divider />
      <CardActions className={classes.actionContainer}>
        <TextField
          id="outlined-textarea"
          label="Message"
          placeholder="Message"
          rowsMax={2}
          multiline
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleSubmit}
        >
          Send
        </Button>
      </CardActions>
    </Card>
  );
};
export default Chat;
