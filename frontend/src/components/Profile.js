// import React from 'react';
// import { Container, Box, Typography, Button, Grid, Avatar, Card, CardContent, Divider } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import EmailIcon from '@mui/icons-material/Email';
// import LocationOnIcon from '@mui/icons-material/LocationOn';

// const ProfilePage = ({user}) => {
// //   const user = {
// //     name: "John Doe",
// //     email: "johndoe@example.com",
// //     location: "New York, USA",
// //     bio: "A passionate web developer and designer.",
// //     avatarUrl: "https://i.pravatar.cc/150?img=3", // A sample avatar image
// //   };

//   return (
//     <Container maxWidth="sm">
//       <Box 
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           marginTop: 4
//         }}
//       >
//         <Avatar 
//           alt={user.name} 
//           src={user.avatar.url} 
//           sx={{ width: 100, height: 100 }} 
//         />
//       </Box>

//       <Box 
//         sx={{ 
//           textAlign: 'center', 
//           marginTop: 2 
//         }}
//       >
//         <Typography variant="h4" component="h1">{user.name}</Typography>
//         <Typography variant="subtitle1" color="textSecondary">A passionate web developer and designer.</Typography>
//         <Box sx={{ marginY: 2 }}>
//           <Button 
//             variant="contained" 
//             startIcon={<EditIcon />} 
//             color="primary"
//           >
//             Edit Profile
//           </Button>
//         </Box>
//       </Box>

//       <Card 
//         sx={{ 
//           marginTop: 3, 
//           padding: 2 
//         }}
//       >
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 <EmailIcon sx={{ verticalAlign: 'middle' }} /> Email
//               </Typography>
//               <Typography variant="body1">{user.email}</Typography>
//             </Grid>

//             <Divider sx={{ width: '100%', marginY: 2 }} />

//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 <LocationOnIcon sx={{ verticalAlign: 'middle' }} /> Location
//               </Typography>
//               <Typography variant="body1">{user.name}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ProfilePage;

// import React, { useEffect, useState } from 'react';
// import { Container, Box, Typography, Button, Grid, Avatar, Card, CardContent, Divider, TextField } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import EmailIcon from '@mui/icons-material/Email';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';


// const ProfilePage = ({ user }) => {
//     const navigate = useNavigate()
//     const{isAuthenticated} = useSelector(state=>state.user)
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedName, setUpdatedName] = useState(user.name);
//   const [updatedAvatar, setUpdatedAvatar] = useState(null); // Handle avatar file input

//   // Toggle edit mode
//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   // Handle form submission
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', updatedName);
//     if (updatedAvatar) {
//       formData.append('avatar', updatedAvatar); // Append avatar file if it's updated
//     }

//     try {
//       const response = await axios.put('/api/v1/update-profile', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       console.log('Profile updated:', response.data);
//       // You can add a success message or update the user state after successful update
//       setIsEditing(false);
      
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   useEffect(()=>{
//     if(isAuthenticated===false){
//         navigate('/auth')
//     }
//   },[isAuthenticated,navigate])

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
//         <Avatar alt={user.name} src={user.avatar.url} sx={{ width: 100, height: 100 }} />
//       </Box>

//       <Box sx={{ textAlign: 'center', marginTop: 2 }}>
//         {!isEditing ? (
//           <>
//             <Typography variant="h4" component="h1">{user.name}</Typography>
//             <Typography variant="subtitle1" color="textSecondary">A passionate web developer and designer.</Typography>
//             <Box sx={{ marginY: 2 }}>
//               <Button variant="contained" startIcon={<EditIcon />} color="primary" onClick={handleEditClick}>
//                 Edit Profile
//               </Button>
//             </Box>
//           </>
//         ) : (
//           // Edit form
//           <form onSubmit={handleFormSubmit}>
//             <TextField
//               label="Name"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               value={updatedName}
//               onChange={(e) => setUpdatedName(e.target.value)}
//             />
//             <input
//               accept="image/*"
//               type="file"
//               onChange={(e) => setUpdatedAvatar(e.target.files[0])}
//             />
//             <Box sx={{ marginY: 2 }}>
//               <Button type="submit" variant="contained" color="primary">
//                 Save Changes
//               </Button>
//               <Button variant="outlined" color="secondary" onClick={handleEditClick} sx={{ marginLeft: 2 }}>
//                 Cancel
//               </Button>
//             </Box>
//           </form>
//         )}
//       </Box>

//       <Card sx={{ marginTop: 3, padding: 2 }}>
//         <CardContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 <EmailIcon sx={{ verticalAlign: 'middle' }} /> Email
//               </Typography>
//               <Typography variant="body1">{user.email}</Typography>
//             </Grid>

//             <Divider sx={{ width: '100%', marginY: 2 }} />

//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 <LocationOnIcon sx={{ verticalAlign: 'middle' }} /> Location
//               </Typography>
//               <Typography variant="body1">{user.name}</Typography>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default ProfilePage;




import React, { useState } from 'react';
import { Container, Box, Typography, Button, Grid, Avatar, Card, CardContent, Divider, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router v6
import { useDispatch } from 'react-redux';
import { logout } from '../Reducers/userSignupReducer';

const ProfilePage = ({ user }) => {
    const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(user.name);
  const [updatedAvatar, setUpdatedAvatar] = useState(null); // Handle avatar file input
  const navigate = useNavigate();

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Handle form submission for profile update
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', updatedName);
    if (updatedAvatar) {
      formData.append('avatar', updatedAvatar); // Append avatar file if it's updated
    }

    try {
      const response = await axios.put('/api/v1/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
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
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleEditClick} sx={{ marginLeft: 2 }}>
                Cancel
              </Button>
            </Box>
          </form>
        )}
      </Box>

      <Card sx={{ marginTop: 3, padding: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <EmailIcon sx={{ verticalAlign: 'middle' }} /> Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>

            <Divider sx={{ width: '100%', marginY: 2 }} />

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <LocationOnIcon sx={{ verticalAlign: 'middle' }} /> Location
              </Typography>
              <Typography variant="body1">{user.location}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;

