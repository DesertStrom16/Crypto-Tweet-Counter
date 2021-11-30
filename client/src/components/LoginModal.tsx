import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import styled from "styled-components";
import useInput from "../hooks/use-login-input";
import { isAuth } from "../store/user/userSlice";
import { Color } from "../helper";
import { MediumHeaderTextTwo } from "../helper/Font";
import { login } from "../helper/API";
import { setObject } from "../helper/LocalStorage";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

const Wrapper = styled.form`
  outline: 0;
  background-color: rgb(245, 245, 245);
  border-radius: 12px;
  width: 450px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.div`
  ${MediumHeaderTextTwo}
  color: ${Color.darkGrey};
  margin: 60px 0px 40px 0px;
`;

const LoginModal: React.FC<{}> = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const {
    value: username,
    setIsTouched: setUsernameTouched,
    hasError: usernameHasError,
    helperText: usernameHelperText,
    setError: setUsernameErr,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput("Username");

  const {
    value: password,
    setIsTouched: setPasswordTouched,
    hasError: passwordHasError,
    helperText: passwordHelperText,
    setError: setPasswordErr,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput("Password");

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setUsernameTouched(true);
    setPasswordTouched(true);

    if (usernameHasError || passwordHasError) {
      return;
    }

    setLoginLoading(true);

    await login(username, password)
      .then(async (res) => {
        if (res.token) {
          // Save token in LocalStorage
          await setObject("@TOKEN", res.token);

          // Set user auth true
          dispatch(isAuth({ auth: true, token: res.token }));
        } else if (res.error) {
          let emptyErr = { msg: "", value: "" };
          // Determine type of error
          if (res.error.type === "username") {
            setUsernameErr({ msg: res.error.msg, value: username });
            setPasswordErr(emptyErr);
          } else {
            setPasswordErr({ msg: res.error.msg, value: password });
            setUsernameErr(emptyErr);
          }
          setLoginLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper onSubmit={loginHandler}>
      <Title>Login</Title>
      <TextField
        sx={{ width: "250px", marginBottom: "15px" }}
        label="Username"
        variant="outlined"
        value={username}
        onChange={usernameChangeHandler}
        onBlur={usernameBlurHandler}
        error={usernameHasError}
        helperText={usernameHelperText}
      />
      <TextField
        sx={{ width: "250px" }}
        value={password}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        error={passwordHasError}
        helperText={passwordHelperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        sx={{ marginTop: "15px", height: "36px" }}
        variant="contained"
        type="submit"
      >
        {loginLoading ? <CircularProgress size={20} color="inherit" /> : "Go"}
      </Button>
    </Wrapper>
  );
};

export default LoginModal;
