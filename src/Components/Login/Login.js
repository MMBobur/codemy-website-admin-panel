import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Container, CssBaseline } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { signIn } from "../store/actions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    widows: "100%",
    height: "100vh",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  input: {
    backgroundColor: "#fff",
  },
  submit: {
    padding: "12px 0px",
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleChange1 = (e) => {
    setUser(e.target.value);
  };

  const handleChange2 = (e) => {
    setPassword(e.target.value);
  };

  const history = useHistory();

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signIn({ username: user, password: password, history }));
    // history.push("/");
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" style={{ color: "#fff" }} variant="h4">
            Welcome To Admin Panel
          </Typography>
          <form className={classes.form}>
            <TextField
              className={classes.input}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={handleChange1}
            />
            <TextField
              className={classes.input}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange2}
            />
          </form>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            className={classes.submit}
          >
            Sign In
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
