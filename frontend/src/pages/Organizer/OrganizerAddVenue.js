import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const OrganizerAddVenue = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
  name: "",
  place: "",
  contact: "",
  description: "",
  event_type: "",       // default value
  food_type: "",            // default value
  equipment_type: "", // default value
});


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!form.name || !form.place || !form.contact || !form.description || !form.event_type || !form.food_type || !form.equipment_type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await axiosClient.post("/organizer/venues", form);

      alert("Venue added successfully!");

      setForm({
        name: "",
        place: "",
        contact: "",
        description: "",
        event_type: "",
        food_type: "",
        equipment_type: "",
      });

      navigate("/organizer/create-event");
    } catch (err) {
      alert("Error adding venue, please check your API/server.");
      console.error(err);
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

      {/* OVERLAY */}
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
          ADD VENUE
        </Button>
      </Box>

      {/* FORM */}
      <Paper
        elevation={5}
        sx={{
          width: "50%",
          mx: "auto",
          mt: 4,
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Venue Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Place / Location"
            name="place"
            value={form.place}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Contact Number"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Venue Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          {/* EVENT TYPE */}
          <TextField
            select
            fullWidth
            label="Event Type"
            name="event_type"
            value={form.event_type}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            <MenuItem value="Wedding">Wedding</MenuItem>
            <MenuItem value="Birthday">Birthday</MenuItem>
            <MenuItem value="Corporate">Corporate</MenuItem>
            <MenuItem value="Concert">Concert</MenuItem>
          </TextField>

          {/* FOOD TYPE */}
          <TextField
            select
            fullWidth
            label="Food Package"
            name="food_type"
            value={form.food_type}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            <MenuItem value="Veg">Veg</MenuItem>
            <MenuItem value="Non-Veg">Non-Veg</MenuItem>
            <MenuItem value="Buffet">Buffet</MenuItem>
            <MenuItem value="Snacks Only">Snacks Only</MenuItem>
          </TextField>

          {/* EQUIPMENT TYPE */}
          <TextField
            select
            fullWidth
            label="Equipment Type"
            name="equipment_type"
            value={form.equipment_type}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            <MenuItem value="Sound System">Sound System</MenuItem>
            <MenuItem value="Lighting">Lighting</MenuItem>
            <MenuItem value="Stage Setup">Stage Setup</MenuItem>
            <MenuItem value="Chairs & Tables">Chairs & Tables</MenuItem>
          </TextField>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#003548",
                color: "white",
                fontWeight: "bold",
                px: 4,
                py: 1,
                borderRadius: 2,
              }}
            >
              Submit
            </Button>

            <Button
              variant="outlined"
              sx={{
                borderColor: "red",
                color: "red",
                fontWeight: "bold",
                px: 4,
                py: 1,
                borderRadius: 2,
              }}
              onClick={() => navigate("/organizer/create-event")}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default OrganizerAddVenue;
