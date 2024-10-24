// ToggleThemeSwitch.js
import React, { useContext } from 'react';
import { Switch, FormControlLabel } from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';

const ToggleThemeSwitch = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <FormControlLabel
      control={
        <Switch
          checked={darkMode}
          onChange={toggleTheme}
          color="primary"
        />
      }
      label={darkMode ? 'Modo Oscuro' : 'Modo Claro'}
      labelPlacement="end"
    />
  );
};

export default ToggleThemeSwitch;
