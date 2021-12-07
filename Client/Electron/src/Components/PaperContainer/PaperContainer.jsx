import { Paper } from '@mui/material';
import React from 'react';

const PaperContainer = ({ widthProp, heightProp, displayProp, paddingProp, elevation, children, ...props }) => {
  return (
    <Paper elevation={elevation} sx={{ display: displayProp, width: widthProp, minHeight: heightProp, padding: paddingProp, alignItems: props.alignItems || 'flex-start', justifyContent: props.justifyContent || 'center', flexFlow: props.flexFlow }}>
      {children}
    </Paper>
  );
};

export default PaperContainer;