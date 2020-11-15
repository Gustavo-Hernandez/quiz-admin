import {
  Grid,
  makeStyles,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React, { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  content: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    fontWeight: "800",
    margin: theme.spacing(1),
  },
  email: {
    fontWeight: "800",
    color: theme.palette.secondary.main,
  },
  confirmationContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Verification = ({ history }) => {
  const classes = useStyles();
  const {
    signout,
    sendConfirmationEmail,
    state: { email, confirmationMessage },
  } = useContext(AuthContext);
  return (
    <Grid container className={classes.root} justify="center">
      <Grid container item xs={12} sm={8} md={6} justify="center">
        <div className={classes.content}>
          <Avatar className={classes.avatar}>
            <MailOutlineIcon />
          </Avatar>
          <Typography
            className={classes.title}
            component="h5"
            variant="h5"
            align="center"
            gutterBottom
          >
            Please verify your email
          </Typography>
          <Typography component="p" variant="subtitle1" align="center">
            You are almost there! We sent an email to:
          </Typography>
          <Typography
            className={classes.email}
            component="p"
            variant="subtitle1"
            align="center"
          >
            {email}
          </Typography>
          <Typography
            component="p"
            variant="subtitle1"
            align="center"
            gutterBottom
          >
            Just click on the link in that email to complete your signup.
            <br />
            If you don't see it you may need to
            <span style={{ fontWeight: 800 }}> check your spam </span> folder.
          </Typography>
          <Typography
            component="p"
            variant="caption"
            align="center"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            gutterBottom
          >
            Still can't find the email?
          </Typography>
          {confirmationMessage.length > 0 ? (
            <div className={classes.confirmationContainer}>
              <Typography
                component="p"
                variant="subtitle2"
                align="center"
                style={{
                  marginTop: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "#28a745",
                }}
                gutterBottom
              >
                {confirmationMessage}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => history.go(0)}
              >
                Continue
              </Button>
            </div>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={sendConfirmationEmail}
            >
              Resend email
            </Button>
          )}
          <Typography
            component="p"
            variant="caption"
            align="center"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            gutterBottom
          >
            or
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={signout}
          >
            Switch account
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
export default Verification;
