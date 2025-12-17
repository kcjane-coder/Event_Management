import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const RSVP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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

       {/* Sidebar Buttons with Active Highlight */}
               <Button
                         variant="text"
                         onClick={() => navigate("/OrganizerDashBoard")}
                         sx={getButtonStyle("/OrganizerDashBoard")}
                       >
                         Dashboard
                       </Button>
               
                       <Button
                         variant="text"
                         onClick={() => navigate("/organizer/create-event")}
                         sx={getButtonStyle("/organizer/create-event")}
                       >
                         Create Event
                       </Button>
                       <Button
                         variant="text"
                         onClick={() => navigate("/Organizerbookings")}
                         sx={getButtonStyle("/Organizerbookings")}
                       >
                         View Bookings
                       </Button>
               
                       <Button
                         variant="text"
                         onClick={() => navigate("/Organizerguest-list")}
                         sx={getButtonStyle("/Organizerguest-list")}
                       >
                         Guest List
                       </Button>
               
                       <Button
                         variant="text"
                         onClick={() => navigate("/Organizerrsvp")}
                         sx={getButtonStyle("/Organizerrsvp")}
                       >
                         RSVP
                       </Button>
               
                       <Button
                         variant="text"
                         onClick={() => navigate("/Organizernotifications")}
                         sx={getButtonStyle("/Organizernotifications")}
                       >
                         Notifications
                       </Button>
               
                       <Button
                         variant="text"
                         onClick={() => navigate("/Organizerprofile")}
                         sx={getButtonStyle("/Organizerprofile")}
                       >
                         Profile
                       </Button>
       

        <Button sx={{ mt: "auto", color: "red", fontWeight: "bold" }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* RSVP CONTENT */}
      <Paper
        elevation={4}
        sx={{
          width: "40%",
          mx: "auto",
          mt: 6,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          RSVP CONTROL PANEL
        </Typography>

        <TextField fullWidth label="Event" margin="normal" />
        <TextField fullWidth label="Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField fullWidth label="Time" type="time" margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField fullWidth label="Venue" margin="normal" />
        <TextField fullWidth label="Guest Name" margin="normal" />
        <TextField fullWidth label="Guest Email" margin="normal" />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, backgroundColor: "#004b63" }}
        >
          Send Invitation
        </Button>
      </Paper>
    </Box>
  );
};

export default RSVP;
