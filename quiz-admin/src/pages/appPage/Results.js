import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      height: "100%",
      width: "90%",
      borderRadius:"8px",
      backgroundColor: "rgba(255,255,255,0.4)",
      
    },
    resultsContainer:{
        height: "100%",
        width: "100%",
        display:"flex",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"space-around",
    },
    item:{
        fontSize:"2rem",
        fontWeight:"bold",
        backgroundColor:"red",
        color:"white",
        padding: "3px 20px",
        borderRadius:"5px",
        background: "linear-gradient(to right, #ff416c, #ff4b2b)"
    },
    title:{
        fontWeight:"bold",
        textAlign:"center",
        color:"white",
    }

  }));

const Results = ({results, handleClose}) =>{
    const classes = useStyles();
    const resultComponents = results.map(user =><div className={classes.item}>{user.username} | {user.score}</div>)
    return (
    <div className={classes.root}>
        <Button
              variant="contained"
              onClick={handleClose}
              color="primary"
              className={classes.buttonExit}
            >
              Hide Results
            </Button>
            <Typography component="h4" variant="h4" className={classes.title}>Scores</Typography>
      <div className={classes.resultsContainer}>
        {resultComponents}
      </div>
    </div>
  );
}
export default Results;