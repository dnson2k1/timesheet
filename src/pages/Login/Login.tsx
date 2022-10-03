import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link, Grid, Box } from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useStyles } from "./loginStyles";
import { useForm } from "react-hook-form";
import { IDataInput } from "./typeLogin";
import { loginAuth } from "./loginSlice";
import { useAppDispatch, useAppSelector } from "~/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const { accessToken } = useAppSelector((state) => state.loginReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDataInput>({
    mode: "onTouched",
  });

  const [remember, setRemember] = useState<boolean>(false);

  const handleOnSubmitForm = (data: IDataInput) => {
    dispatch(
      loginAuth({
        userNameOrEmailAddress: data.username,
        password: data.password,
        rememberClient: remember,
      })
    );
    if (data.username !== "admin" || data.password !== "123qwe") {
      toast.error("Incorrect username or password");
      return;
    }
  };

  const handleRemember = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/projects");
    }
  }, [accessToken]);
  return (
    <Box className={classes.login}>
      <Box>
        <Typography className={classes.heading}>Timesheet</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleOnSubmitForm)}
          data-test="login-form"
        >
          <TextField
            id="username"
            variant="standard"
            margin="normal"
            fullWidth
            label="User name"
            autoComplete="email"
            autoFocus
            data-set="input-username"
            {...register("username", { required: true })}
          />
          <div>
            {errors.username?.type === "required" && (
              <p className={classes.error}>username is required</p>
            )}
          </div>

          <TextField
            id="password"
            variant="standard"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            data-set="input-password"
            autoComplete="current-password"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <div>
            {errors.password?.type === "required" && (
              <p className={classes.error}>password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className={classes.error}>
                Password must be at least 6 characters
              </p>
            )}
          </div>
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={handleRemember}
              />
            }
            label="Remember me"
          />
          <Button
            value="Login"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" noWrap>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
