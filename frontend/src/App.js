import React, { useState } from 'react';
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Authentications/RegisterPage";
import LoginPage from "./pages/Authentications/LoginPage";
import UserDashBoard from "./pages/User/UserDashBoard";
import OrganizerDashBoard from "./pages/Organizer/OrganizerDashBoard";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import OrganizerCreateEvent from "./pages/Organizer/OrganizerCreateEvent";
import PostForm from './components/PostForm';

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
      </Routes>
    </Router>
  );
}

export default App;
