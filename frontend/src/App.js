import React, { useState } from 'react';
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage";
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
      </Routes>
    </Router>
  );
}

export default App;
