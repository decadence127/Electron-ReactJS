import { Paper } from '@mui/material';
import React from 'react';

const PaperContainer = ({ widthProp, heightProp, displayProp, paddingProp, elevation, children }) => {
  return (
    <Paper elevation={elevation} sx={{ display: displayProp, width: widthProp, height: heightProp, padding: paddingProp, alignItems: 'flex-start', justifyContent: 'center' }}>
      {children}
    </Paper>
  );
};

export default PaperContainer;