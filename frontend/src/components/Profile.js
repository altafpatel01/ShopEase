import React, { useState } from 'react';
import { Container, Box, Typography, Button, Avatar, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6
import { useDispatch } from 'react-redux';
import { logout } from '../Reducers/userSignupReducer';
import {FaShoppingBasket } from 'react-icons/fa';

const ProfilePage = ({ user }) => {
    const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedAvatar, setUpdatedAvatar] = useState(null); // Handle avatar file input
  const [updating,setupdating] = useState(false)
  const navigate = useNavigate();

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission for profile update
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setupdating(!updating)
    const formData = new FormData();
    formData.append('name', updatedName);
    if (updatedAvatar) {
      formData.append('avatar', updatedAvatar); // Append avatar file if it's updated
    }

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/update-profile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      window.location.reload();
      console.log('Profile updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth'); // Redirect user to login page
  };
 
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Avatar alt={user.name} src={user.avatar.url} sx={{ width: 100, height: 100 }} />
      </Box>

      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        {!isEditing ? (
          <>
            <Typography variant="h4" component="h1">{user.name}</Typography>
            <Typography variant="subtitle1" color="textSecondary">A passionate web developer and designer.</Typography>
            <Box sx={{ marginY: 2 }}>
              <Button variant="contained" startIcon={<EditIcon />} color="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
              <Button variant="outlined" startIcon={<LogoutIcon />} color="secondary" onClick={handleLogout} sx={{ marginLeft: 2 }}>
                Logout
              </Button>
            </Box>
          </>
        ) : (
          // Edit form
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <input
              accept="image/*"
              type="file"
              onChange={(e) => setUpdatedAvatar(e.target.files[0])}
            />
            <Box sx={{ marginY: 2 }}>
              <Button type="submit" variant="contained" color="primary">
               {!updating?'Save Changes':'Updating Profile'} 
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleEditClick} sx={{ marginLeft: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>

      <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <EmailIcon style={{ marginRight: '0.5rem' }} />
          <h6 style={{ margin: 0 }}>Email</h6>
        </div>
        <p>{user.email}</p>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '1rem 0' }} />

      <div>
        <div onClick={()=>{navigate('/orders')}} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <FaShoppingBasket style={{ marginRight: '0.5rem' }} />
          <h6 style={{ margin: 0 }}>Orders</h6>
        </div>
        <p>{user.location}</p>
      </div>
    </div>

    </Container>
  );
};

export default ProfilePage;

