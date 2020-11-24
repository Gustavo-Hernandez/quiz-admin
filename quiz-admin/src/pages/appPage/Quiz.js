import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    height: "100%",
    borderRadius: "10px",
    backgroundColor: "#7E57C2",
    boxShadow: "0px 0px 15px 1px rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  questionContainer: {
    flex: "1 1 auto",
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: "8px",
    padding: "8px",
  },
  optionsContainer: {
    width: "100%",
    marginTop: "15px",
    marginBottom: "30px",
  },
  question: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  quizOption: {
    height: "100px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0px 0px 2px 1px rgba(0,0,0,0.45)",
    },
  },
}));

const Quiz = ({ question, title, handleNext, handleEnd, isEnding }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h3 className={classes.questionHeader}>{title}</h3>
      <div className={classes.questionContainer}>
        <div className={classes.question}>{question}</div>
      </div>
      <div className={classes.optionsContainer}>
        <Grid container spacing={1} justify="center">
          <Grid item xs={10}>
           {isEnding ?  <button
              onClick={handleEnd}
              className={classes.quizOption}
              style={{ backgroundColor: "#f44336" }}
            >
              End Quiz
            </button>:<button
              onClick={handleNext}
              className={classes.quizOption}
              style={{ backgroundColor: "#f44336" }}
            >
              Next Question
            </button>}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Quiz;
