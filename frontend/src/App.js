import React, { useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';

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
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            React + Laravel Blog
          </Typography>
          <Button color="inherit" onClick={() => handleOpenForm()}>
            Add New Post
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <PostList onSelect={handleOpenForm} key={refresh} />
      </Container>

      <PostForm
        open={openForm}
        onClose={handleCloseForm}
        selectedPost={selectedPost}
        onSaved={handleSaved}
      />
    </>
  );
}

export default App;
