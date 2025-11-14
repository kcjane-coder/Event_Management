import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import axiosClient from "../api/axiosClient";

const RegisterPage = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [formData, setFormData] = useState({
    role: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const roles = ["User", "Organizer", "Admin"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axiosClient.post("/register", {
        role: formData.role,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);
      alert("Account registered successfully!");

      // reset form
      setFormData({
        role: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // ✅ redirect to login page after success
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
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
          width: { xs: "90%", sm: "400px" },
          textAlign: "center",
          backgroundColor: "#693f2e",
          color: "#fff",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Create an account
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <TextField
            select
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            margin="normal"
            required
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff" } }}
            SelectProps={{ style: { color: "#fff" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#fff" },
                "&:hover fieldset": { borderColor: "#fff" },
                "&.Mui-focused fieldset": { borderColor: "#fff" },
              },
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>

          {/* Username, Email, Password, Confirm Password */}
          {[
            { label: "Username", name: "username" },
            { label: "Email", name: "email" },
            { label: "Password", name: "password" },
            { label: "Confirm Password", name: "confirmPassword" },
          ].map(({ label, name }) => (
            <TextField
              key={name}
              fullWidth
              label={label}
              name={name}
              type={
                label.toLowerCase().includes("password")
                  ? "password"
                  : label === "Email"
                  ? "email"
                  : "text"
              }
              value={formData[name]}
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
          ))}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              background: "linear-gradient(90deg, #8758f1, #eb9362)",
              color: "#693f2e",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                background: "linear-gradient(90deg, #6b3ec3, #cc7446)",
              },
            }}
          >
            Register
          </Button>

          {/* ✅ Sign In Button */}
          <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
            Already have an account?
          </Typography>
          <Button
            onClick={() => navigate("/login")} // ✅ navigate to LoginPage
            variant="outlined"
            fullWidth
            sx={{
              mt: 1,
              borderColor: "#fff",
              color: "#fff",
              textTransform: "none",
              "&:hover": {
                borderColor: "#eb9362",
                color: "#eb9362",
              },
            }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
