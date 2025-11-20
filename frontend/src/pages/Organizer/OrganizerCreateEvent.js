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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

const OrganizerCreateEvent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/organizer/venues");
      setVenues(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load venues. Please try again.");
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

  const handleDetails = (venue) => {
    setSelectedVenue(venue);
    setDetailsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedVenue) return;
    try {
      await axiosClient.delete(`/organizer/venues/${selectedVenue.id}`);
      setDeleteDialogOpen(false);
      fetchVenues(); // refresh the list
      alert("Venue deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete venue. Please try again.");
    }
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
          onClick={() => navigate("/venues")}
          sx={getButtonStyle("/venues")}
        >
          View Venues
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/bookings")}
          sx={getButtonStyle("/bookings")}
        >
          View Bookings
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/guest-list")}
          sx={getButtonStyle("/guest-list")}
        >
          Guest List
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/rsvp")}
          sx={getButtonStyle("/rsvp")}
        >
          RSVP
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/notifications")}
          sx={getButtonStyle("/notifications")}
        >
          Notifications
        </Button>
        <Button
          variant="text"
          onClick={() => navigate("/profile")}
          sx={getButtonStyle("/profile")}
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
          CREATE EVENT
        </Button>
      </Box>

      {/* MAIN CONTAINER */}
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
        {/* ADD VENUE BUTTON */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "yellow",
            fontWeight: "bold",
            mb: 2,
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
          }}
          onClick={() => navigate("/organizer/add-venue")}
        >
          Add Venue
        </Button>

        {/* VENUES TABLE */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#003548" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Venue Name
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Place / Location
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Contact Number
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Venue Description
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {venues.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.name}</TableCell>
                    <TableCell>{v.place}</TableCell>
                    <TableCell>{v.contact}</TableCell>
                    <TableCell>{v.description}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ mr: 1 }}
                        onClick={() => {
                          setSelectedVenue(v);
                          setDetailsDialogOpen(true);
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setSelectedVenue(v);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {venues.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No venues yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* DETAILS DIALOG */}
      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
      >
        <DialogTitle>Venue Details</DialogTitle>
        <DialogContent>
          <Typography><b>Name:</b> {selectedVenue?.name}</Typography>
          <Typography><b>Place:</b> {selectedVenue?.place}</Typography>
          <Typography><b>Contact:</b> {selectedVenue?.contact}</Typography>
          <Typography><b>Description:</b> {selectedVenue?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* DELETE CONFIRMATION DIALOG */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete <b>{selectedVenue?.name}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrganizerCreateEvent;
