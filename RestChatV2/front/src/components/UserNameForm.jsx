// components/UserNameForm.jsx
import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const UserNameForm = ({ username, setUsername, onConfirm }) => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '2rem', marginBottom: 4 }}>
        Introduce tu nombre
      </Typography>
      <TextField
        label="Tu Nombre"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ '& .MuiInputBase-input': { fontSize: '1.2rem' } }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <Button 
          variant="contained" 
          onClick={onConfirm} 
          sx={{ fontSize: '1.2rem' }}
        >
          Confirmar Nombre
        </Button>
      </Box>
    </Box>
  );
};

export default UserNameForm;
