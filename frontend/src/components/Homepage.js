import React from "react";
import { Box, Button, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "120px 20px",
          color: "white",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Event Management Org
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Looking for an event? Register and book an event now!
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Planify: Organize, Invite, Attend
        </Typography>
        
        {/* ✅ Added navigation here */}
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={() => navigate("/register")}
        >

          Register Now
        </Button>
      </Box>

      

      {/* Event Categories Section */}
      <Box sx={{ mt: 6, px: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            {
              title: "Birthday",
              img: "https://i.pinimg.com/736x/0a/84/cf/0a84cf0ca0e1c3c4182f3b0bca80b5e8.jpg",
            },
            {
              title: "Wedding",
              img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Party",
              img: "https://i.pinimg.com/736x/80/ae/bc/80aebca153d785441deee72ea69cb35e.jpg",
            },
          ].map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.title}>
              <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={event.img}
                  alt={event.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {event.title.toUpperCase()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Homepage;