import { useRef, useState } from "react";
import {
  FormButton,
  FormCard,
  FormContainer,
  FormTextField,
  FormTitle,
} from "../components/StyledComponents";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axiosClient";
import AlertTitle from "@mui/material/AlertTitle";
import { Alert, Typography, Box, Skeleton } from "@mui/material";
import DarkModeButton from "./../components/darkmodeButton";

export default function Register() {
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const [redirectToOTP, setRedirectToOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonloading, setIsButtonLoading] = useState(false);

  if (loading) {
    return (
      <FormContainer>
        <Skeleton variant="rounded" width={720} height={526} />
      </FormContainer>
    );
  }

  const submit = async (ev) => {
    ev.preventDefault();
    setIsButtonLoading(true);
    setErr("");
    if (passwordRef.current.value == confirmPasswordRef.current.value) {
      const formData = new FormData();
      formData.append("first_name", firstnameRef.current.value);
      formData.append("last_name", lastnameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);

      axiosClient
        .post("/users/register", formData)
        .then(({ data }) => {
          setMsg(data.message);
          setRedirectToOTP(true);
        })
        .catch((err) => {
          console.log(formData);
          const response = err.response;
          console.log(err);
          if (response) {
            setErr(response.data.message);
          }
        })
        .finally(() => setIsButtonLoading(false));
    } else {
      setErr("Passwords do not match.");
      setIsButtonLoading(false);
      console.log(err);
    }
  };

  if (redirectToOTP) {
    return <Navigate to="/otp" />;
  }
  return (
    <FormContainer
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <FormCard className="form" sx={{ maxHeight: "200vh" }}>
        {err && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            <AlertTitle>Error</AlertTitle>
            {err}
          </Alert>
        )}
        {msg && (
          <Alert severity="success" sx={{ marginBottom: "1rem" }}>
            <AlertTitle>Success</AlertTitle>
            {msg}
          </Alert>
        )}
        <form onSubmit={submit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: "1rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <FormTitle variant="h1" className="title">
                Personal Information
              </FormTitle>
              <FormTextField
                inputRef={firstnameRef}
                type="name"
                name=""
                id="standard-basic"
                label="First Name"
                variant="standard"
                required
              />
              <FormTextField
                inputRef={lastnameRef}
                type="name"
                name=""
                id="standard-basic"
                label="Last Name"
                variant="standard"
                required
              />
              <FormTextField
                inputRef={emailRef}
                type="email"
                name=""
                id="standard-basic"
                label="Email"
                variant="standard"
                required
              />
              <FormTextField
                inputRef={passwordRef}
                type="password"
                name=""
                id="standard-basic"
                label="Password"
                variant="standard"
                required
              />
              <FormTextField
                inputRef={confirmPasswordRef}
                type="password"
                name=""
                id="standard-basic"
                label="Confirm Password"
                variant="standard"
                required
              />
            </Box>
          </Box>
          <FormButton
            variant="contained"
            className="btn btn-black"
            type="submit"
            loading={isButtonloading}
          >
            Sign-Up
          </FormButton>
        </form>
        <Typography
          variant="body2"
          className="message"
          sx={{ marginTop: "1rem", textAlign: "center" }}
        >
          Already Have An Account? <Link to="/login">Login</Link>
        </Typography>
      </FormCard>
      <DarkModeButton></DarkModeButton>
    </FormContainer>
  );
}
