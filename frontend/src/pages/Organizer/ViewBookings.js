import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import axiosClient from "../../api/axiosClient";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axiosClient.get("/organizer/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Booking List
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 4, borderRadius: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#003548" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Event Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Venue</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No bookings found.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b, index) => (
                  <TableRow key={index}>
                    <TableCell>{b.eventName}</TableCell>
                    <TableCell>{b.venue}</TableCell>
                    <TableCell>{b.date}</TableCell>
                    <TableCell>{b.status}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ViewBookings;