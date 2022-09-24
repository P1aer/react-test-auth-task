import React, { useEffect, useState } from "react";
import "./index.scss";
import {
  Button,
  Container,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchToken } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import SimpleDialog from "../Dialog/dialogWindow";

const AuthView = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const onSubmit = (data: FieldValues) => {
    dispatch(
      fetchToken({
        params: {
          username: data.name,
          password: data.password,
        },
        remember: data.remember,
      })
    );
  };

  const [showPass, setShow] = useState(false);
  const [open, setClose] = useState(false);
  const handleClickShowPassword = () => {
    setShow((prev) => !prev);
  };
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const onClose = () => {
    resetField("password");
    setClose(false);
  };
  useEffect(() => {
    if (token.data) {
      nav("/users");
    }
  }, [token.data]);

  useEffect(() => {
    if (token.status !== "error") {
      return;
    }
    setClose(true);
  }, [token.status]);

  return (
    <div className="wrapper">
      <Container maxWidth="sm">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="form-h2">Welcome</h2>
          <p className="form-inform">Please fill the form to continue!</p>
          <div className="inputs form-container">
            <TextField
              fullWidth
              margin="dense"
              id="name"
              type="text"
              label="username"
              placeholder="ILikeIceCream"
              {...register("name", {
                required: "this field is required",
                maxLength: {
                  value: 150,
                  message: "username is too big",
                },
                minLength: {
                  value: 1,
                  message: "username it too small",
                },
                pattern: {
                  value: /^[\w.@+-]+$/,
                  message: "Letters, digits and @/./+/-/_ only",
                },
              })}
              error={!!errors?.name}
              helperText={errors?.name ? (errors.name.message as string) : null}
            />
            <TextField
              fullWidth
              margin="dense"
              placeholder="coolPass1"
              id="password"
              type={showPass ? "text" : "password"}
              label="password"
              {...register("password", {
                required: "this field is required",
                maxLength: {
                  value: 128,
                  message: "password is too big",
                },
                minLength: {
                  value: 1,
                  message: "password it too small",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Password is not following the pattern",
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors?.password}
              helperText={
                (errors?.password
                  ? (errors.password.message as string)
                  : null) ||
                (token.status === "error" ? "Wrong username or password" : null)
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={false}
                  id="remember"
                  {...register("remember")}
                />
              }
              label="Remember me"
            />
          </div>
          <div className="form-container">
            <Button
              disabled={token.status === "loading"}
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Authorize
            </Button>
          </div>
        </form>
      </Container>
      <SimpleDialog open={open} onClose={onClose} />
    </div>
  );
};

export default AuthView;
