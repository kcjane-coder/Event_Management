import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

const PostForm = ({ open, onClose, selectedPost, onSaved }) => {
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    if (selectedPost) setForm(selectedPost);
    else setForm({ title: '', content: '' });
  }, [selectedPost]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedPost) await axiosClient.put(`/posts/${selectedPost.id}`, form);
      else await axiosClient.post('/posts', form);
      onSaved();
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{selectedPost ? 'Edit Post' : 'Add New Post'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              name="title"
              label="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <TextField
name="content"
              label="Content"
              multiline
              rows={4}
              value={form.content}
              onChange={handleChange}
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button type="submit" variant="contained">
            {selectedPost ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PostForm;