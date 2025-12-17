import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // SAMPLE DATA (replace with API)
  const [notifications, setNotifications] = useState([
    { id: 1, date: "2025-10-02", text: 'Venue "Paco Beach" created successfully!' },
    { id: 2, date: "2025-10-02", text: "Sent a Wedding invitation to arbanjay@gmail.com" },
    { id: 3, date: "2025-10-02", text: "Arban responded the invitation" },
    { id: 4, date: "2025-10-02", text: "Sent an invitation to justinearabas@gmail.com" },
    { id: 5, date: "2025-10-02", text: "Sent an invitation to kenneth@gmail.com" },
    { id: 6, date: "2025-10-02", text: "Sent an invitation to mechlundahan@gmail.com" },
    { id: 7, date: "2025-10-02", text: "Justine responded the invitation" },
    { id: 8, date: "2025-10-02", text: "Kenneth responded the invitation" },
  ]);

  const handleLogout = () => {
    localStorage.clear();
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

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://i.pinimg.com/736x/65/d6/b6/65d6b6447e454e4d6a45a4e056d5cb6e.jpg')",
        backgroundSize: "cover",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          px: 4,
          background: "linear-gradient(90deg, #004b63, #001f2f)",
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

        <Typography variant="h5" fontWeight="bold">
          Event Management Org
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
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
          transition: "0.4s",
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

      {/* CONTENT */}
      <Paper
        elevation={4}
        sx={{
          width: "70%",
          mx: "auto",
          mt: 6,
          p: 3,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          NOTIFICATIONS
        </Typography>

        {/* DATE HEADER */}
        <Box
          sx={{
            backgroundColor: "#004b63",
            color: "white",
            px: 2,
            py: 1,
            fontWeight: "bold",
            borderRadius: 1,
            mb: 2,
          }}
        >
          2025-10-02
        </Box>

        {/* LIST */}
        {notifications.map((n) => (
          <Box
            key={n.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "1px solid #333",
              borderRadius: 1,
              p: 1.5,
              mb: 1,
              backgroundColor: "white",
            }}
          >
            <Typography>{n.text}</Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "red",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#b30000" },
              }}
              onClick={() => handleDelete(n.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default Notifications;
