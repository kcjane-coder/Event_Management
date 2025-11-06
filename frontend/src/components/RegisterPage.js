import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Link,
} from "@mui/material";
import axios from "axios"; // ✅ Import axios

const RegisterPage = () => {
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

    // basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // ✅ adjust the URL to your Laravel route (e.g., localhost:8000/api/register)
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        role: formData.role,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);
      alert("Account registered successfully!");

      // optionally reset form
      setFormData({
        role: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

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

          {/* Username, Email, Password, Confirm Password Fields */}
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
      : "text"}
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

          <Typography variant="body2" sx={{ mt: 2, color: "#fff" }}>
            Already have an account?{" "}
            <Link href="#" underline="hover" sx={{ color: "#ffe8d6" }}>
              Sign in
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
