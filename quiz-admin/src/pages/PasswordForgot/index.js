import {
  Grid,
  makeStyles,
  Typography,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React, { useContext, useState } from "react";
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

const PasswordForgot = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const {
    sendRecoveryEmail,
    state: { confirmationMessage, error },
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
            Forgot your password?
          </Typography>
          <Typography component="p" variant="subtitle1" align="center">
            Confirm your email address.
          </Typography>
          <Typography
            component="p"
            variant="subtitle1"
            align="center"
            gutterBottom
          >
            We will send you the instuctions on how to change your password.
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="emial"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error}
          <Typography
            component="p"
            variant="caption"
            align="center"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
            gutterBottom
          >
            Still can't find the email? Check your spam folder.
          </Typography>
          {confirmationMessage.length > 0 ? (
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
          ) : (
            <div className={classes.confirmationContainer}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => sendRecoveryEmail({ email })}
              >
                Send email
              </Button>
              <Typography
                component="p"
                variant="caption"
                align="center"
                style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                gutterBottom
              >
                or
              </Typography>
            </div>
          )}
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => history.goBack()}
          >
            Go back
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};
export default PasswordForgot;
