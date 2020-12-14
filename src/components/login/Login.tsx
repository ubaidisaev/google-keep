import React from "react";
import {
  withStyles,
  Container,
  Button,
  TextField,
  Grid,
  Typography,
  CssBaseline,
  LinearProgress
} from "@material-ui/core";

import {KeepIcon} from "components/icons";

import { auth } from "services/firebase";
import { signup, signin, authSuccess, resetpassword } from "store/actions/auth";
import { connect } from "react-redux";

import Message from "components/login/Message";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";

const styles = (theme: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column" as "column",
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
  },
  linearProgress: {
    marginTop: theme.spacing(1)
  }
});

interface InputFieldProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  inputType: string;
}

const InputField: React.FC<InputFieldProps> = ({
  handleChange,
  label,
  name,
  inputType
}) => {
  return (
    <TextField
      onChange={handleChange}
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label={label}
      name={name}
      type={inputType}

    />
  );
};

interface IProps {
  user: any;
  classes: any;
  authMessage: string;
  authMessageType: string;
  loading: boolean;
  isLoggedIn: boolean;
  location: any;
  signup: (email: string, password: string, userName: string) => void;
  signin: (email: string, password: string) => void;
  resetpassword: (email: string) => void;
  authSuccess: (uesr: any) => void;
}

class Login extends React.Component<IProps> {
  state = {
    password: "",
    email: "",
    userName: ""
  };

  onInputFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  

  sumbitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { signup, signin, resetpassword } = this.props;
    const { email, password, userName } = this.state;
    const pathName = this.props.location.pathname.slice(1);
    if (pathName === "signup") {
      return signup(email, password, userName);
    } else if (pathName === "resetpassword") {
      return resetpassword(email);      
    } else {
      return signin(email, password);      
    }
  };

  render() {
    const { loading, authMessage, authMessageType, classes } = this.props;
    const path = this.props.location.pathname; //"/login".slice(1)
    const pathName = path.slice(1);

    const signupMode = pathName === "signup";
    const signinMode = pathName === "signin" ||  pathName === '';
    const resetpasswordMode = pathName === "resetpassword";

    

    const getFormTitle = () => {
      switch (pathName) {
        case "signup":
          return "Sign Up";
        case "resetpassword":
          return "Rest Password";
        default:
          return "Sign In";
      }
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <KeepIcon />
          <Typography component="h1" variant="h5">
            {getFormTitle()}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.sumbitForm}>
            {signupMode && (
              <InputField
                handleChange={this.onInputFieldChange}
                label="Username"
                name="userName"
                inputType="text"
              />
            )}

            <InputField
              handleChange={this.onInputFieldChange}
              label="Email Address"
              name="email"
              inputType="text"
            />

            {!resetpasswordMode && (
              <InputField
                handleChange={this.onInputFieldChange}
                label="Password"
                name="password"
                inputType="password"
                
              />
            )}

            {loading && <LinearProgress className={classes.linearProgress} />}
            {authMessage && (
              <Message message={authMessage} type={authMessageType} />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="inherit"
              className={classes.submit}
              disabled={loading ? true : false}
            >
              {getFormTitle()}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/resetpassword">Forgot password?</Link>
              </Grid>
              <Grid item>
                {signinMode ? (
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                ) : (
                  <Link to="/signin">Sign In</Link>
                )}
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const LoginWithRouter = withRouter<RouteComponentProps<any>, any>(Login);

const mapStateToProps = (state: any) => ({
  loading: state.auth.inProgress,
  authMessage: state.auth.authMessage,
  authMessageType: state.auth.authMessageType,
  isLoggedIn: state.auth.user.isLoggedIn
});

const mapDispatchToProps = (dispatch: any) => ({
  signup: (email: string, password: string, userName: string) =>
    dispatch(signup(email, password, userName)),
  signin: (email: string, password: string) =>
    dispatch(signin(email, password)),
  authSuccess: (user: any) => dispatch(authSuccess(user)),
  resetpassword: (email: string) => dispatch(resetpassword(email))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LoginWithRouter));
