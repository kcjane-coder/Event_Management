import React, { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Card, CardContent, Typography, Container, Button } from '@mui/material';

const PostList = ({ onSelect }) => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const { data } = await axiosClient.get('/posts');
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Posts</Typography>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>{post.content}</Typography>
            <Button variant="outlined" sx={{ mt: 1 }} onClick={() => onSelect(post)}>
              Edit
            </Button>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default PostList;