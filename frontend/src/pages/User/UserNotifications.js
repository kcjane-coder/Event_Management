import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const UserNotifications = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const getButtonStyle = (path) => ({
    textAlign: "left",
    justifyContent: "flex-start",
    fontWeight: "bold",
    boxShadow: location.pathname === path ? 3 : "none",
    backgroundColor: location.pathname === path ? "#e0e0e0" : "transparent",
    borderRadius: 1,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://i.pinimg.com/736x/65/d6/b6/65d6b6447e454e4d6a45a4e056d5cb6e.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          px: 4,
          background: "linear-gradient(90deg, #0c6f78, #062f3a)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            letterSpacing: 1,
          }}
        >
          Event Management Org
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccountCircleIcon sx={{ fontSize: 36 }} />
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

      {/* OVERLAY */}
      {menuOpen && (
        <Box
          onClick={() => setMenuOpen(false)}
          sx={{
            position: "fixed",
            inset: 0,
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
        <Typography variant="h6" fontWeight="bold">
          MENU
        </Typography>

        <Button sx={getButtonStyle("/userdashboard")} onClick={() => navigate("/userdashboard")}>
          Dashboard
        </Button>

        <Button sx={getButtonStyle("/user/venues")} onClick={() => navigate("/user/venues")}>
          Venues
        </Button>

        <Button sx={getButtonStyle("/user/bookings")} onClick={() => navigate("/user/bookings")}>
          Booking History
        </Button>

        <Button sx={getButtonStyle("/user/notifications")} onClick={() => navigate("/user/notifications")}>
          Notifications
        </Button>

        <Button sx={getButtonStyle("/UserProfile")} onClick={() => navigate("/UserProfile")}>
          Profile
        </Button>

        <Button sx={{ mt: "auto", color: "red", fontWeight: "bold" }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* TITLE */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "white",
            color: "black",
            fontWeight: "bold",
            borderRadius: 3,
            px: 5,
            py: 1.2,
            fontSize: "1.05rem",
          }}
        >
          NOTIFICATION
        </Button>
      </Box>

      {/* NOTIFICATION CARD */}
      <Paper
        elevation={6}
        sx={{
          width: "75%",
          mx: "auto",
          mt: 4,
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        {/* DATE HEADER */}
        <Box
          sx={{
            backgroundColor: "#0b4f5a",
            color: "white",
            px: 3,
            py: 1.5,
            fontWeight: "bold",
          }}
        >
          2025-10-02
        </Box>

        {/* ROW 1 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Typography>
            cvincenigel@gmail.com sent you an invitation
          </Typography>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#cfcfcf",
                color: "black",
                fontWeight: "bold",
                borderRadius: 2,
                px: 3,
              }}
            >
              View
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#e53935",
                color: "white",
                fontWeight: "bold",
                borderRadius: 2,
                px: 3,
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
            borderBottom: "1px solid #ccc",
          }}
        >
          <Typography>
            Successfully booked a venue for “Paco Beach”
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e53935",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
            }}
          >
            Delete
          </Button>
        </Box>

        {/* ROW 3 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 2,
          }}
        >
          <Typography>
            Payment for “Paco Beach” is processed
          </Typography>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#e53935",
              color: "white",
              fontWeight: "bold",
              borderRadius: 2,
              px: 3,
            }}
          >
            Delete
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserNotifications;
