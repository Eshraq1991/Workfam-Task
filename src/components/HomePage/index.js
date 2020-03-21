import React from "react";
import { Paper, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

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
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 16,
    display: "flex",
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "white"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: "white",
    backgroundColor: "#357CAB"
  }
});

function HomePage(props) {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <div className="intrance-video">
        <video autoPlay muted loop>
          <source src="https://workfam.com/video.mp4" type="video/mp4"></source>
        </video>
      </div>
      <Paper className={classes.paper}>
        <img alt="home" src="https://workfam.com/favicon.ico"></img>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          component={Link}
          to="/register"
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
          Login
        </Button>
      </Paper>
    </main>
  );
}

export default withStyles(styles)(HomePage);
