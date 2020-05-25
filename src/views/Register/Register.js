import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PersonAdd from "@material-ui/icons/PersonAdd";
import { registrAction } from "../../store/actions/regis";
import { connect } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Your Website
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Register = props => {
  const classes = useStyles();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        submitHandler(event);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [email, password]);

  const submitHandler = e => {
    e.preventDefault();
    const data = {
      password,
      email
    };
    props.registrAction(data, handleRedirect);
  };

  const valueHandler = (e, type) => {
    if (type === "email") {
      if (errors && errors.error) {
        setErrors({});
      }
      setEmail(event.target.value.trim());
    }
    if (type === "password") {
      if (errors && errors.error) {
        setErrors({});
      }
      setPassword(event.target.value.trim());
    }
  };

  const handleRedirect = () => {
    props.history.push("/auth/login-page");
  };

  return (
    <DIV>
      <Container component="main" maxWidth="xs" color="secondary">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => valueHandler(e, "email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => valueHandler(e, "password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {errors && errors.error && (
              <div className="errors">{props.errors.error}</div>
            )}
            <Grid container>
              <Grid item>
                <Link to={"/auth/login-page"} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </DIV>
  );
};

const DIV = styled.div`
  background-color: #fff;
  border-radius: 5px;

  .errors {
    display: block;
    color: red;
    padding: 10px;
    background-color: #ffc0cb59;
    text-align: center;
    margin-bottom: 5px;
  }
`;

const mapStateToPros = state => {
  return {
    user: state.reg.user,
    loading: state.reg.loading,
    errors: state.reg.errors
  };
};

const mapDispatchToProps = {
  registrAction
};

export default connect(mapStateToPros, mapDispatchToProps)(Register);
