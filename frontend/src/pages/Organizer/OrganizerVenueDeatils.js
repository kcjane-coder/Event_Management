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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const OrganizerVenueDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [venue, setVenue] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);

  useEffect(() => {
    if (!venue) {
      loadVenueDetails();
    }
  }, []);

  const loadVenueDetails = async () => {
    try {
      const res = await axiosClient.get(`/organizer/venues/${id}`);
      setVenue(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
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
    boxShadow: window.location.pathname === path ? 3 : "none",
    backgroundColor: window.location.pathname === path ? "#e0e0e0" : "transparent",
    borderRadius: 1,
  });

  const leftCellStyle = {
    backgroundColor: "#1e4f4f",
    color: "white",
    fontWeight: "bold",
    border: "2px solid black",
    textAlign: "center",
    width: "40%",
    padding: "12px",
  };

  const rightCellStyle = {
    backgroundColor: "#238686",
    color: "white",
    border: "2px solid black",
    textAlign: "center",
    width: "60%",
    padding: "12px",
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://i.pinimg.com/736x/65/d6/b6/65d6b6447e454e4d6a45a4e056d5cb6e.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 0,
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
              whiteSpace: "nowrap",
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

        <Button
          sx={{ mt: "auto", color: "red", fontWeight: "bold" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {/* PAGE TITLE */}
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
          VENUE DETAILS
        </Button>
      </Box>

      {/* MAIN CONTAINER */}
      <Paper
        elevation={5}
        sx={{
          width: "70%",
          mx: "auto",
          mt: 4,
          p: 3,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : !venue ? (
          <Typography sx={{ color: "red", textAlign: "center" }}>
            Venue not found.
          </Typography>
        ) : (
          <TableContainer
            sx={{
              border: "1.5px solid black", // outer border
              borderRadius: 3,
            }}
          >
            <Table>
              <TableBody>
                {[
                  ["ID", venue.id],
                  ["Name", venue.name],
                  ["Place", venue.place],
                  ["Contact", venue.contact],
                  ["Description", venue.description],
                  ["Event Type", venue.event_type],
                  ["Food Type", venue.food_type],
                  ["Equipment Type", venue.equipment_type],
                ].map(([label, value]) => (
                  <TableRow key={label}>
                    <TableCell sx={leftCellStyle}>{label}</TableCell>
                    <TableCell sx={rightCellStyle}>{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* BACK BUTTON */}
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#d6ff78",
              color: "black",
              fontWeight: "bold",
              borderRadius: 2,
              px: 5,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#c4ee62",
              },
            }}
            onClick={() => navigate(-1)}
          >
            BACK
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrganizerVenueDetails;
