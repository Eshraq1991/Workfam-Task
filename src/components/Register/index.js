import React, { useState } from "react";
import {
  Typography,
  Paper,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormLabel
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import firebase from "../firebase";
const styles = (theme) => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    },
    backgroundColor: "transparaent"
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "white"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#357CAB",
    color: "white"
  }
});

function Register(props) {
  const { classes } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  return (
    <main className={classes.main}>
      <div className="intrance-video">
        <video autoPlay muted loop>
          <source src="https://workfam.com/video.mp4" type="video/mp4"></source>
        </video>
      </div>
      <Paper className={classes.paper}>
        <img src="https://workfam.com/favicon.ico" alt="register"></img>
        <Typography component="h1" variant="h5">
          Register Partner
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => e.preventDefault() && false}
        >
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <RadioGroup
              aria-label="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <FormLabel component="legend">Partner Type</FormLabel>
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Specific"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Any-time"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={onRegister}
            className={classes.submit}
          >
            Register
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            component={Link}
            to="/login"
            className={classes.submit}
          >
            Go back to Login
          </Button>
        </form>
      </Paper>
    </main>
  );

  async function onRegister() {
    try {
      await firebase.register(type, email, password);
      props.history.replace("/schedule");
    } catch (error) {
      alert(error.message);
    }
  }
}

export default withRouter(withStyles(styles)(Register));
