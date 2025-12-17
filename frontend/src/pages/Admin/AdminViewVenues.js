import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const AdminViewVenues = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const res = await axiosClient.get("/admin/venues");
      setVenues(res.data);
    } catch (err) {
      console.error("Failed to load venues", err);
    } finally {
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

        <Button sx={getButtonStyle("/AdminDashBoard")} onClick={() => navigate("/AdminDashBoard")}>
          Dashboard
        </Button>
        <Button sx={getButtonStyle("/adminbookings")} onClick={() => navigate("/adminbookings")}>
          View Bookings
        </Button>
        <Button sx={getButtonStyle("/AdminViewVenues")} onClick={() => navigate("/AdminViewVenues")}>
          View Venues
        </Button>
        <Button sx={getButtonStyle("/admin/organizers")} onClick={() => navigate("/admin/organizers")}>
          Organizers
        </Button>
        <Button sx={getButtonStyle("/admin/users")} onClick={() => navigate("/admin/users")}>
          Users
        </Button>

        

        <Button sx={{ mt: "auto", color: "red", fontWeight: "bold" }} onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* TITLE */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1,
            fontSize: "1.1rem",
            color: "black",
            backgroundColor: "white",
            borderWidth: 2,
          }}
        >
          ALL VENUES
        </Button>
      </Box>

      {/* CONTENT */}
      <Paper
        elevation={4}
        sx={{
          width: "80%",
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(6px)",
        }}
      >
        {loading ? (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        ) : venues.length === 0 ? (
          <Typography textAlign="center" fontWeight="bold">
            No venues found.
          </Typography>
        ) : (
          venues.map((v, index) => (
            <Paper
              key={v.id}
              elevation={4}
              sx={{
                mb: 3,
                p: 3,
                borderRadius: 3,
                background: "linear-gradient(90deg, #0c2d3d, #1bb3a7)",
                color: "white",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} md={1}>
                  <Typography fontWeight="bold">#{index + 1}</Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="caption">Venue Name</Typography>
                  <Typography fontWeight="bold">{v.name}</Typography>
                  <Typography variant="caption">Place</Typography>
                  <Typography>{v.place}</Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="caption">Event Type</Typography>
                  <Typography>{v.event_type}</Typography>
                  <Typography variant="caption">Food Type</Typography>
                  <Typography>{v.food_type}</Typography>
                </Grid>

                <Grid item xs={12} md={3}>
                  <Typography variant="caption">Contact</Typography>
                  <Typography>{v.contact}</Typography>
                </Grid>

                <Grid item xs={12} md={2} textAlign="center">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#c7ff4f",
                      color: "black",
                      fontWeight: "bold",
                      borderRadius: 5,
                    }}
                    onClick={() =>
                      navigate(`/admin/venues/${v.id}`, { state: v })
                    }
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default AdminViewVenues;
