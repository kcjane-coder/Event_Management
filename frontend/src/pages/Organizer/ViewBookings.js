import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const ViewBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // ----------- FETCH BOOKINGS ----------
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axiosClient.get("/organizer/bookings");
        setBookings(res.data); 
      } catch (err) {
        console.error(err);
        alert("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, pr: 4 }}>
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

        <Button variant="text" sx={getButtonStyle("/OrganizerDashBoard")} onClick={() => navigate("/OrganizerDashBoard")}>
          Dashboard
        </Button>

        <Button variant="text" sx={getButtonStyle("/organizer/create-event")} onClick={() => navigate("/organizer/create-event")}>
          Create Event
        </Button>

        <Button variant="text" sx={getButtonStyle("/venues")} onClick={() => navigate("/venues")}>
          View Venues
        </Button>

        <Button variant="text" sx={getButtonStyle("/bookings")} onClick={() => navigate("/bookings")}>
          View Bookings
        </Button>

        <Button variant="text" sx={getButtonStyle("/guest-list")} onClick={() => navigate("/guest-list")}>
          Guest List
        </Button>

        <Button variant="text" sx={getButtonStyle("/rsvp")} onClick={() => navigate("/rsvp")}>
          RSVP
        </Button>

        <Button variant="text" sx={getButtonStyle("/notifications")} onClick={() => navigate("/notifications")}>
          Notifications
        </Button>

        <Button variant="text" sx={getButtonStyle("/profile")} onClick={() => navigate("/profile")}>
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
            borderRadius: 2,
            px: 4,
            py: 1.2,
            fontSize: "1.1rem",
          }}
        >
          VIEW BOOKINGS
        </Button>
      </Box>

      {/* TABLE */}
      <Paper
        elevation={5}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : bookings.length === 0 ? (
          <Typography textAlign="center" fontWeight="bold">
            No bookings found.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Event Name</b></TableCell>
                  <TableCell><b>Venue</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>{b.id}</TableCell>
                    <TableCell>{b.event_name}</TableCell>
                    <TableCell>{b.venue_name}</TableCell>
                    <TableCell>{b.event_date}</TableCell>
                    <TableCell>{b.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default ViewBookings;
