import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const UserDashBoard = () => {
  const navigate = useNavigate();

  // ✅ State keys match your actual data
  const [summary, setSummary] = useState({
    AvailableVenues: 2,
    TotalBookings: 0,
    Notifications: 1,
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axiosClient.get("/admin/summary"); 
      setSummary(res.data); // API should return { AvailableVenues, TotalBookings, Notifications }
    } catch (error) {
      console.error("Failed to load summary:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
  sx={{
    minHeight: "100vh",
    p: 0,
    backgroundImage: "url('https://i.pinimg.com/736x/65/d6/b6/65d6b6447e454e4d6a45a4e056d5cb6e.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      {/* HEADER */}
      <Box sx={{ width: "100%", p: 2, px: 4, background: "linear-gradient(90deg, #004b63, #001f2f)", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button startIcon={<MenuIcon />} variant="contained" sx={{ backgroundColor: "#fff", color: "#003548", fontWeight: "bold", borderRadius: 2, textTransform: "none" }} onClick={() => setMenuOpen(true)}>
            Menu
          </Button>
          <Typography variant="h5" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontWeight: "bold", whiteSpace: "nowrap" }}>
            Event Management Org
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, pr: 4 }}>
          <AccountCircleIcon sx={{ fontSize: 38 }} />
          <Button variant="contained" sx={{ backgroundColor: "#fff", color: "#003548", fontWeight: "bold", borderRadius: 2, textTransform: "none" }} onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      {/* SLIDE OUT MENU */}
      {menuOpen && <Box onClick={() => setMenuOpen(false)} sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 10 }} />}

      <Box sx={{ position: "fixed", top: 0, left: 0, width: 250, height: "100vh", backgroundColor: "white", boxShadow: 5, p: 3, zIndex: 11, transform: menuOpen ? "translateX(0)" : "translateX(-300px)", transition: "transform 0.4s ease", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>MENU</Typography>
        <Button variant="text" onClick={() => navigate("/BookVenue")}>Book Venue</Button>
        <Button variant="text" onClick={() => navigate("/venues")}>View Venues</Button>
        <Button variant="text" onClick={() => navigate("/Notifications")}>Notifications</Button>
        <Button variant="text" onClick={() => navigate("/BookingHistory")}>Booking History</Button>
        <Button variant="text" onClick={() => navigate("/Profile")}>Profile</Button>
        <Button sx={{ mt: "auto", color: "red", fontWeight: "bold" }} onClick={handleLogout}>Logout</Button>
      </Box>

      {/* EVENT SUMMARY TITLE */}
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
      color: "black",          // Black font
      borderColor: "black",    // Black border
      backgroundColor: "white", // White background
    }}
  >
    EVENT SUMMARY
  </Button>
</Box>

      {/* SUMMARY CARD */}
      <Paper elevation={4} sx={{ width: "60%", mx: "auto", mt: 4, borderRadius: 4, p: 4, backgroundColor: "rgba(255,255,255,0.4)", backdropFilter: "blur(5px)" }}>
        <Grid container spacing={4} justifyContent="center">
          {/* Available Venues */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: "#004b63", color: "white", borderRadius: 3, p: 3, textAlign: "center" }}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Available Venues</Typography>
              <Typography sx={{ fontSize: "3rem", fontWeight: "bold", color: "#ffae00" }}>{summary.AvailableVenues}</Typography>
            </Box>
          </Grid>

          {/* Total Bookings */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: "#004b63", color: "white", borderRadius: 3, p: 3, textAlign: "center" }}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Total Bookings</Typography>
              <Typography sx={{ fontSize: "3rem", fontWeight: "bold", color: "#ffae00" }}>{summary.TotalBookings}</Typography>
            </Box>
          </Grid>

          {/* Notifications */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: "#004b63", color: "white", borderRadius: 3, p: 3, textAlign: "center" }}>
              <Typography sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>Notifications</Typography>
              <Typography sx={{ fontSize: "3rem", fontWeight: "bold", color: "#ffae00" }}>{summary.Notifications}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserDashBoard;
