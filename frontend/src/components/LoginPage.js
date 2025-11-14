import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ import this
import axiosClient from "../api/axiosClient";

const SignInPage = () => {
  const navigate = useNavigate(); // ✅ initialize navigation

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Login request
      const response = await axiosClient.post("/login", {
        username: formData.username,
        password: formData.password,
      });

      console.log("Login successful:", response.data);

      const { token, user } = response.data;

      // store token and user data if needed
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("Login successful!");

      // ✅ Role-based redirection
      if (user.role === "User") {
        navigate("/UserDashBoard");
      } else if (user.role === "Organizer") {
        navigate("/OrganizerDashBoard");
      } else if (user.role === "Admin") {
        navigate("/AdminDashBoard");
      } else {
        alert("Unknown role. Please contact support.");
      }

    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid username or password.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://i.pinimg.com/736x/ba/db/6c/badb6c1d09072777afeb59cca4c47b07.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          borderRadius: 4,
          width: { xs: "90%", sm: "380px" },
          textAlign: "center",
          backgroundColor: "#693f2e",
          color: "#fff",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{ color: "#fff" }}
        >
          Sign in
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              background: "linear-gradient(90deg, #8758f1, #eb9362)",
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #6b3ec3, #cc7446)",
              },
            }}
          >
            Login
          </Button>

          {/* Forgot Password */}
          <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
            Forgot your password?{" "}
            <Link
              href="#"
              underline="hover"
              sx={{ color: "#ffe8d6", fontWeight: "bold" }}
            >
              Reset
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default SignInPage;

