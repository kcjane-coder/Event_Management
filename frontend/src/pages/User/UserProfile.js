import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const UserProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const [profile, setProfile] = useState({
    id: "",
    role: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
  try {
    const res = await axiosClient.get("/organizer/profile");

    setProfile({
      id: res.data.id,
      role: res.data.role,
      username: res.data.username,
      email: res.data.email,
    });

  } catch (error) {
    console.error("Profile error:", error);
  }
};



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getButtonStyle = (path) => ({
    textAlign: "left",
    justifyContent: "flex-start",
    fontWeight: "bold",
    boxShadow: location.pathname === path ? 3 : "none",
    backgroundColor: location.pathname === path ? "#e0e0e0" : "transparent",
    borderRadius: 1,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 0,
        backgroundImage:
          "url('https://i.pinimg.com/736x/65/d6/b6/65d6b6447e454e4d6a45a4e056d5cb6e.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          width: "100%",
          p: 2,
          px: 4,
          background: "linear-gradient(90deg, #004b63, #001f2f)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LEFT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            startIcon={<MenuIcon />}
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#003548",
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </Button>

          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            Event Management Org
          </Typography>
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountCircleIcon sx={{ fontSize: 38 }} />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#003548",
              fontWeight: "bold",
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* DARK OVERLAY */}
      {menuOpen && (
        <Box
          onClick={() => setMenuOpen(false)}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 10,
          }}
        />
      )}

      {/* SIDEBAR */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 250,
          height: "100vh",
          backgroundColor: "white",
          boxShadow: 5,
          p: 3,
          zIndex: 11,
          transform: menuOpen ? "translateX(0)" : "translateX(-300px)",
          transition: "transform 0.4s ease",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          MENU
        </Typography>

       <Button sx={getButtonStyle("/UserDashBoard")} onClick={() => navigate("/UserDashBoard")}>
                         Dashboard
                       </Button>
                       <Button sx={getButtonStyle("/UserBookEvent")} onClick={() => navigate("/UserBookEvent")}>
                         Book Event
                       </Button>
                       <Button sx={getButtonStyle("/user/venues")} onClick={() => navigate("/user/venues")}>
                         View Venues
                       </Button>
                       <Button sx={getButtonStyle("/user/notifications")} onClick={() => navigate("/user/notifications")}>
                         Notifications
                       </Button>
                       <Button sx={getButtonStyle("/user/bookings")} onClick={() => navigate("/user/bookings")}>
                         Booking History
                       </Button>
                       <Button sx={getButtonStyle("/UserProfile")} onClick={() => navigate("/UserProfile")}>
                         Profile
                       </Button>

        <Button sx={{ mt: "auto", color: "red", fontWeight: "bold" }} onClick={handleLogout}>Logout</Button>
      </Box>

      {/* PROFILE TITLE */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            fontWeight: "bold",
            borderWidth: 2,
            borderRadius: 2,
            px: 4,
            py: 1,
            fontSize: "1.1rem",
            color: "black",
            borderColor: "black",
            backgroundColor: "white",
          }}
        >
          PROFILE
        </Button>
      </Box>

      {/* PROFILE CARD */}
      <Paper
        elevation={4}
        sx={{
          width: "60%",
          mx: "auto",
          mt: 4,
          borderRadius: 4,
          p: 4,
          backgroundColor: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(5px)",
        }}
      >
        {/* Avatar */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <AccountCircleIcon sx={{ fontSize: 120, color: "#003548" }} />
        </Box>

        {/* Info Table */}
        <table
          style={{
            width: "70%",
            margin: "auto",
            borderCollapse: "collapse",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          <tbody>
            <tr>
              <td style={cellStyle}>ID</td>
              <td style={valueStyle}>{profile.id}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Role</td>
              <td style={valueStyle}>{profile.role}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Username</td>
              <td style={valueStyle}>{profile.username}</td>
            </tr>
            <tr>
              <td style={cellStyle}>Email</td>
              <td style={valueStyle}>{profile.email}</td>
            </tr>
          </tbody>
        </table>
      </Paper>
    </Box>
  );
};

const cellStyle = {
  backgroundColor: "#003548",
  color: "white",
  padding: "12px",
  width: "30%",
  border: "1px solid black",
  textAlign: "left",
};

const valueStyle = {
  backgroundColor: "white",
  padding: "12px",
  border: "1px solid black",
  textAlign: "left",
};

export default UserProfile;
