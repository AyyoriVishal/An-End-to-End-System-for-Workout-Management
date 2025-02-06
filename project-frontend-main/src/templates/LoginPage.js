import { Grid, InputLabel, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import "../templates/css/Registrationf.css";
import { Link, useNavigate } from "react-router-dom";
import { IP } from "./constants.js";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      userName,
      password,
    };
    try {
      const response = await fetch(`http://${IP}:5000/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        details();
        navigate("/home");
        window.location.reload();
      } else {
        alert("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div class="cont-f">
        <div class="box">
          <Grid justifyContent="center">
            <Grid item xs={12}>
              <h3 align="center">
                <span class="span"></span>
                Login
              </h3>
            </Grid>
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} class="ip_bx">
                <input
                  type="text"
                  id="userName"
                  name="username"
                  fullWidth
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label>UserName</label>
              </Grid>
              <Grid item xs={12} class="ip_bx">
                <input
                  id="password"
                  name="password"
                  type="password"
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Enter Your Password</label>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} class="loginl">
                <p variant="body1">
                  Don't have an account?{" "}
                  <Link to="/register" class="loginlink">
                    Register here
                  </Link>
                </p>
              </Grid>
            </form>
          </Grid>
        </div>
      </div>
    </>
  );
}
