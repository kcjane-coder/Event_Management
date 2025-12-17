import React, { useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const BookVenue = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    place: "",
    venue: "",
    event: "",
    date: "",
    guests: "",
  });

  const venues = ["Grand Hall", "Conference Center", "Outdoor Garden"];

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

  const handleSubmit = async () => {
    try {
      await axiosClient.post("/book-event", form);
      alert("Event booked successfully!");
      navigate("/BookingHistory");
    } catch (err) {
      alert("Failed to book event.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 0,
        backgroundImage:
          "url('https://i.pinimg.com/736x/65/d6/b6/65d6b6447e454e4d6a45a4e056d5cb6e.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
          BOOK EVENT
        </Button>
      </Box>

      {/* TABLE-STYLE FORM CARD */}
      <Paper
        elevation={4}
        sx={{
          width: "60%",
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.4)",
          backdropFilter: "blur(5px)",
        }}
      >
        <Box
          sx={{
            border: "2px solid black",
            borderRadius: 2,
            overflow: "hidden",
            mb: 3,
          }}
        >
          {/* PLACE */}
          <Box sx={{ display: "flex", borderBottom: "2px solid black" }}>
            <Box
              sx={{
                width: "40%",
                backgroundColor: "#0e877d",
                color: "white",
                fontWeight: "bold",
                p: 2,
                borderRight: "2px solid black",
                textTransform: "uppercase",
              }}
            >
              PLACE
            </Box>
            <Box sx={{ width: "60%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
                sx={{
                  "& fieldset": { border: "none" },
                  backgroundColor: "white",
                }}
              />
            </Box>
          </Box>

          {/* VENUE */}
          <Box sx={{ display: "flex", borderBottom: "2px solid black" }}>
            <Box
              sx={{
                width: "40%",
                backgroundColor: "#0e877d",
                color: "white",
                fontWeight: "bold",
                p: 2,
                borderRight: "2px solid black",
                textTransform: "uppercase",
              }}
            >
              VENUE
            </Box>
            <Box sx={{ width: "60%" }}>
              <TextField
                fullWidth
                select
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                sx={{
                  "& fieldset": { border: "none" },
                  backgroundColor: "white",
                }}
              >
                {venues.map((v, i) => (
                  <MenuItem key={i} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>

          {/* EVENT */}
          <Box sx={{ display: "flex", borderBottom: "2px solid black" }}>
            <Box
              sx={{
                width: "40%",
                backgroundColor: "#0e877d",
                color: "white",
                fontWeight: "bold",
                p: 2,
                borderRight: "2px solid black",
                textTransform: "uppercase",
              }}
            >
              EVENT
            </Box>
            <Box sx={{ width: "60%" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={form.event}
                onChange={(e) => setForm({ ...form, event: e.target.value })}
                sx={{
                  "& fieldset": { border: "none" },
                  backgroundColor: "white",
                }}
              />
            </Box>
          </Box>

          {/* DATE */}
          <Box sx={{ display: "flex", borderBottom: "2px solid black" }}>
            <Box
              sx={{
                width: "40%",
                backgroundColor: "#0e877d",
                color: "white",
                fontWeight: "bold",
                p: 2,
                borderRight: "2px solid black",
                textTransform: "uppercase",
              }}
            >
              DATE
            </Box>
            <Box sx={{ width: "60%" }}>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                sx={{
                  "& fieldset": { border: "none" },
                  backgroundColor: "white",
                }}
              />
            </Box>
          </Box>

          {/* NUMBER OF GUESTS */}
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "40%",
                backgroundColor: "#0e877d",
                color: "white",
                fontWeight: "bold",
                p: 2,
                borderRight: "2px solid black",
                textTransform: "uppercase",
              }}
            >
              NUMBER OF GUESTS
            </Box>
            <Box sx={{ width: "60%" }}>
              <TextField
                fullWidth
                type="number"
                variant="outlined"
                value={form.guests}
                onChange={(e) => setForm({ ...form, guests: e.target.value })}
                sx={{
                  "& fieldset": { border: "none" },
                  backgroundColor: "white",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* BOOK BUTTON */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#b4ff69",
              color: "black",
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              border: "2px solid black",
              borderRadius: 3,
              "&:hover": { backgroundColor: "#9fff4f" },
            }}
            onClick={handleSubmit}
          >
            BOOK EVENT
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookVenue;
