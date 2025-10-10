/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, type FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Person from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { authSuccess } from "../../../redux/AuthSlice";
import {
  authenticate,
  signIn,
  type AuthData,
  type RegisterData,
} from "../../../services/AuthServices";
// import Checkbox from "@mui/material/Checkbox";
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from "../CustomIcons";
// import Divider from "@mui/material/Divider";
// import FormControlLabel from "@mui/material/FormControlLabel";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface SignInCardProps {
  register?: boolean;
}

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SignInCard: React.FC<SignInCardProps> = ({ register = false }) => {
  const [phoneError, setPhoneError] = useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [typePassword, setTypePassword] = useState<boolean>(false);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("refresh")) {
      navigate("/doctor");
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (phoneError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!register) {
      const rawPassword = data.get("password");
      const answers: AuthData = {
        phone_number: `+261${data.get("phone")}`,
        password: typeof rawPassword === "string" ? rawPassword : null,
      };

      const auth = async (answers: AuthData) => {
        try {
          const data = await authenticate(answers);
          // localStorage.setItem("access", data.tokens.access);
          // localStorage.setItem("refresh", data.tokens.refresh);
          // localStorage.setItem("role", data.role);
          dispatch(
            authSuccess({
              user: {
                id: data.id,
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                role: data.role,
              },
              access: data.tokens.access,
              refresh: data.tokens.refresh,
            })
          );

          const user = sessionStorage.getItem("user");
          if (user) {
            const parsedUser = JSON.parse(user);

            if (localStorage.getItem("refresh")) {
              if (parsedUser.role === "doctor") navigate("/doctor");
              else if (parsedUser.role === "patient") navigate("/patient");
            }
            alert("login successfull");
            alert(localStorage.getItem("refresh"));
            alert(parsedUser.role);
          }
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message);
            alert("login failed : " + err.message);
          } else {
            console.error(err);
          }
        }
      };

      auth(answers);
    } else {
      const rawPassword = data.get("password");
      const rawName = data.get("name");
      const rawPasswordConfirmation = data.get("confirmPassword");
      const rawEmail = data.get("email");
      // const role = data.get("role");

      const register = async (answers: RegisterData) => {
        try {
          const data = await signIn(answers);
          // localStorage.setItem("access", data.tokens.access);
          // localStorage.setItem("refresh", data.tokens.refresh);
          // localStorage.setItem("role", data.role);
          dispatch(
            authSuccess({
              user: {
                id: data.id,
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                role: "patient",
                // role: data.get("role"),
              },
              access: data.tokens.access,
              refresh: data.tokens.refresh,
            })
          );
          if (localStorage.getItem("refresh")) {
            if (sessionStorage.getItem("role") === "doctor")
              navigate("/doctor");
            else if (sessionStorage.getItem("role") === "patient")
              navigate("/patient");
          }
          alert("regsiter successfull");
        } catch (err) {
          if (err instanceof Error) {
            console.error(err.message);
            alert("regsiter failed : " + err.message);
          } else {
            console.error(err);
          }
        }
      };

      const answers: RegisterData = {
        name: typeof rawName === "string" ? rawName : null,
        email: typeof rawEmail === "string" ? rawEmail : null,
        phone_number: `+261${data.get("phone")}`,
        // role: typeof role === "string" ? role : null,
        role: "patient",
        password1: typeof rawPassword === "string" ? rawPassword : null,
        password2:
          typeof rawPasswordConfirmation === "string"
            ? rawPasswordConfirmation
            : null,
      };

      register(answers);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const phone = document.getElementById("phone") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (register) {
      if (!email.value) {
        setPhoneError(true);
        setPhoneErrorMessage("Please enter a valid email address");
        isValid = false;
      } else {
        setPhoneError(false);
        setPhoneErrorMessage("");
      }
    }
    if (!phone.value) {
      setPhoneError(true);
      setPhoneErrorMessage("Please enter a valid phone number");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <Card variant="outlined">
      {/* <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <SitemarkIcon />
      </Box> */}
      {register ? (
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
      ) : (
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Log In
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        {register && (
          <>
            <FormControl>
              <FormLabel htmlFor="phone">Your name</FormLabel>
              <TextField
                error={phoneError}
                helperText={phoneErrorMessage}
                id="name"
                name="name"
                type="text"
                placeholder="ex: Rabe"
                autoComplete="tel"
                required
                fullWidth
                variant="outlined"
                color={phoneError ? "error" : "primary"}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
          </>
        )}
        <FormControl>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <TextField
            error={phoneError}
            helperText={phoneErrorMessage}
            id="phone"
            name="phone"
            type="tel"
            placeholder="ex: 342577814"
            autoComplete="tel"
            required
            fullWidth
            variant="outlined"
            color={phoneError ? "error" : "primary"}
            value={phone}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "");
              if (val.startsWith("0")) val = val.slice(1);
              if (val.length > 9) val = val.slice(0, 9);
              setPhone(val);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon sx={{ marginRight: 1 }} /> +261
                  </InputAdornment>
                ),
              },
              htmlInput: {
                maxLength: 9,
                pattern: "[0-9]{9}",
              },
            }}
          />
        </FormControl>
        {/* {register && (
          <FormControl>
            <FormLabel htmlFor="role">Role</FormLabel>
            <Select id="role" name="role" label="role">
              <MenuItem value={"patient"}>Patient</MenuItem>
              <MenuItem value={"doctor"}>Doctor</MenuItem>
            </Select>
          </FormControl>
        )} */}
        <FormControl>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <FormLabel htmlFor="password">Password</FormLabel>
            {!register && (
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            )}
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type={typePassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setTypePassword(!typePassword)}
                      edge="end"
                      disableRipple={false}
                    >
                      {typePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
          />
        </FormControl>
        {register && (
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Confirm your password</FormLabel>
              {!register && (
                <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
                >
                  Forgot your password?
                </Link>
              )}
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="confirmPassword"
              placeholder="••••••"
              type={typePassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="current-password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setTypePassword(!typePassword)}
                        edge="end"
                        disableRipple={false}
                      >
                        {typePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
        )}
        {/* <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}
        <ForgotPassword open={open} handleClose={handleClose} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputs}
        >
          Sign in
        </Button>
        {register ? (
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link href="/" variant="body2" sx={{ alignSelf: "center" }}>
                Log in
              </Link>
            </span>
          </Typography>
        ) : (
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                href="/signin "
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        )}
      </Box>
      {/*<Divider>or</Divider>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Google")}
          startIcon={<GoogleIcon />}
        >
          {!register ? "Log in" : "Sign in"} with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => alert("Sign in with Facebook")}
          startIcon={<FacebookIcon />}
        >
          {!register ? "Log in" : "Sign in"} in with Facebook
        </Button>
      </Box> */}
    </Card>
  );
};

export default SignInCard;
