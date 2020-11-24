import React, { useContext, useState, useEffect } from "react";
import { Context as QuizContext } from "../../context/QuizContext";
import { makeStyles } from "@material-ui/core/styles";
import { ChatBubble, Close } from "@material-ui/icons";
import {
  Button,
  Fab,
  Popover,
  Snackbar,
  Slide,
  IconButton,
} from "@material-ui/core";
import {
  initiateSocket,
  disconnectSocket,
  subscribeToChat,
  subscribeToFeedback,
  sendStartQuiz,
  sendMessage,
  subscribeToQuiz,
  subscribeToQuestions,
  sendNextQuestion,
  sendEndQuiz,
  subscribeToResults,
  relog,
  sendEndSession
} from "../../api/socketHandler";
import Chat from "./Chat";
import Quiz from "./Quiz";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: "white",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%237a0099'/%3E%3Cstop offset='1' stop-color='%23100399'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23ffffff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E")`,
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonExit: {
    backgroundColor: "rgb(220, 0, 78)",
    color: "white",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  quizContainer: {
    width: "100%",
    height: "70%",
    marginTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Dashboard = () => {
  const {
    state: { session },
    clearSession,
  } = useContext(QuizContext);

  const { title } = session;
  const [showChat, setShowChat] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [quizEnding, setQuizEnding] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({ pregunta: "" });
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const classes = useStyles();

  //Handle Connection
  useEffect(() => {
    initiateSocket(session.pin, session.user.username);
    relog(session.pin,session.user.localId);
    subscribeToChat((err, data) => {
      if (err) {
        return;
      }
      setChatMessages((oldChats) => [...oldChats, data]);
    });
    subscribeToFeedback((err, data) => {
      if (err) {
        return;
      }
      setShowSnackbar(true);
      setSnackMessage(data);
    });
    subscribeToQuestions((err, { offset, question }) => {
      if (err) {
        return;
      }
      if (offset === 0) {
        setQuizEnding(true);
      }
      setCurrentQuestion(question);
    });
    subscribeToResults((err, data) => {
      if (err) {
        return;
      }
      setShowResults(true);
      setResults(data);
    });
    subscribeToQuiz((err, data) => {
      if (err) {
        return;
      }
      setShowQuiz(data);
    });
    return () => {
      disconnectSocket();
    };
  }, [session.pin, session.user]);

  const handleToggle = (event) => {
    setAnchorEl(event.currentTarget);
    setShowChat((prev) => !prev);
  };

  const handleClose = () => {
    setShowChat(false);
    setAnchorEl(null);
  };

  const handleExit = () => {
    clearSession();
    sendEndSession(session.pin);
  };

  const handleMessage = (value) => {
    sendMessage(session.user.username, value, session.pin);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => setShowSnackbar(false)}
        message={snackMessage}
        TransitionComponent={Slide}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setShowSnackbar(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          onClick={handleExit}
          className={classes.buttonExit}
        >
          End Session
        </Button>
        <p style={{ fontWeight: "bold", color: "white", fontSize: "15px" }}>
          PIN : {session.pin}
        </p>
      </div>
      <div className={classes.quizContainer}>
        {showQuiz ? (
          <Quiz
            title={title}
            isEnding={quizEnding}
            question={currentQuestion.pregunta}
            handleEnd={() => sendEndQuiz(session.pin)}
            handleNext={() => sendNextQuestion(session.pin)}
          />
        ) : (
          !quizEnding && (
            <Button
              variant="contained"
              onClick={() => sendStartQuiz(session.pin)}
              className={classes.buttonExit}
            >
              Start Quiz
            </Button>
          )
        )}

        {showResults && results.length > 0 && (
          <Results results={results} handleClose={()=>setShowResults(false)}/>
        )}
        {!showResults && results.length > 0 && (
          <Button
            variant="contained"
            onClick={() => setShowResults(true)}
            className={classes.buttonExit}
          >
            See results
          </Button>
        )}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Chat
          messages={chatMessages}
          sendChatMessage={handleMessage}
          username={session.user.username}
        />
      </Popover>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        onClick={(e) => handleToggle(e)}
        aria-describedby={id}
      >
        {showChat ? <Close /> : <ChatBubble />}
      </Fab>
    </div>
  );
};
export default Dashboard;
