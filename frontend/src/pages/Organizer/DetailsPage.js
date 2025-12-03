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

const OrganizerVenueList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVenues();
  }, []);

  const loadVenues = async () => {
    try {
      const res = await axiosClient.get("/organizer/venues");
      setVenues(res.data);
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
        <Box sx={{ display: "flex", gap: 2 }}>
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

      {/* SIDEBAR */}
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

      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 250,
          height: "100vh",
          backgroundColor: "white",
          p: 3,
          boxShadow: 5,
          zIndex: 11,
          transform: menuOpen ? "translateX(0)" : "translateX(-300px)",
          transition: "0.4s ease",
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
          sx={getButtonStyle("/OrganizerDashBoard")}
          onClick={() => navigate("/OrganizerDashBoard")}
        >
          Dashboard
        </Button>

        <Button
          variant="text"
          sx={getButtonStyle("/organizer/create-event")}
          onClick={() => navigate("/organizer/create-event")}
        >
          Create Event
        </Button>

        <Button
          variant="text"
          sx={getButtonStyle("/organizer/venues")}
          onClick={() => navigate("/organizer/venues")}
        >
          Venues
        </Button>

        <Button
          sx={{ mt: "auto", color: "red", fontWeight: "bold" }}
          onClick={handleLogout}
        >
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
          VENUE LIST
        </Button>
      </Box>

      {/* TABLE */}
      <Paper
        elevation={5}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.85)",
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#003548" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Venue Name</TableCell>
                  <TableCell sx={{ color: "white" }}>Place</TableCell>
                  <TableCell sx={{ color: "white" }}>Contact</TableCell>
                  <TableCell sx={{ color: "white" }}>Description</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {venues.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.place}</TableCell>
                    <TableCell>{v.contact}</TableCell>
                    <TableCell>{v.description}</TableCell>
                  </TableRow>
                ))}

                {venues.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No venues found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default OrganizerVenueList;
