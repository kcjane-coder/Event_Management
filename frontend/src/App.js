import React, { useState } from 'react';
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Authentications/RegisterPage";
import LoginPage from "./pages/Authentications/LoginPage";
import UserDashBoard from "./pages/User/UserDashBoard";
import OrganizerDashBoard from "./pages/Organizer/OrganizerDashBoard";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import Users from "./pages/Admin/Users";
import OrganizerCreateEvent from "./pages/Organizer/OrganizerCreateEvent";
import OrganizerAddVenue from "./pages/Organizer/OrganizerAddVenue";
import ViewBookings from "./pages/Organizer/ViewBookings";
import PostForm from './components/PostForm';
import OrganizerVenueDetails from './pages/Organizer/OrganizerVenueDeatils';
import OrganizerProfile from './pages/Organizer/OrganizerProfile';
import BookVenue from "./pages/User/BookVenue";
import RSVP from "./pages/Organizer/RSVP";
import GuestList from "./pages/Organizer/GuestList";
import Notifications from "./pages/Organizer/Notifications";
import AllBookings from './pages/Admin/AllBookings';
import AdminViewVenues from './pages/Admin/AdminViewVenues';
import AdminProfile from './pages/Admin/AdminProfile';
import UserProfile from './pages/User/UserProfile';
import Organizers from './pages/Admin/Organizers';
import UserViewVenues from './pages/User/UserViewVenues';
import UserBookingHistory from './pages/User/UserBookingHistory';
import UserNotifications from './pages/User/UserNotifications';


function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleOpenForm = (post = null) => {
    setSelectedPost(post);
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setSelectedPost(null);
    setOpenForm(false);
  };

  const handleSaved = () => {
    handleCloseForm();
    setRefresh(!refresh);
  };

  return (
    <Router>
      <PostForm
        open={openForm}
        onClose={handleCloseForm}
        selectedPost={selectedPost}
        onSaved={handleSaved}
      />

      <Routes>
        <Route path="/" element={<Homepage onOpenForm={handleOpenForm} refresh={refresh} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/userdashboard" element={<UserDashBoard />} />
        <Route path="/organizerdashboard" element={<OrganizerDashBoard />} />
        <Route path="/admindashboard" element={<AdminDashBoard />} />
        <Route path="/organizer/create-event" element={<OrganizerCreateEvent />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashBoard />} />
        <Route path="/organizer/add-venue" element={<OrganizerAddVenue />} />
        <Route path="/Organizerbookings" element={<ViewBookings />} /> 
        <Route path="/Organizerprofile" element={<OrganizerProfile />} /> 
        <Route path="/organizer/venue/:id" element={<OrganizerVenueDetails />} />
        <Route path="/UserBookEvent" element={<BookVenue />} />
        <Route path="/admin/users" element={<Users />} />
         <Route path="/Organizerrsvp" element={<RSVP />} />
         <Route path="/Organizerguest-list" element={<GuestList />} />
         <Route path="/Organizernotifications" element={<Notifications />} />
         <Route path="/adminbookings" element={<AllBookings />} />
        <Route path="/AdminViewVenues" element={<AdminViewVenues />} />
        <Route path="/AdminProfile" element={<AdminProfile/>} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/admin/organizers" element={<Organizers/>} />
        <Route path="/user/venues" element={<UserViewVenues />} />
        <Route path="/user/bookings" element={<UserBookingHistory />} />
        <Route path="/user/notifications" element={<UserNotifications />} />



      </Routes>
    </Router>
  );
}

export default App;
