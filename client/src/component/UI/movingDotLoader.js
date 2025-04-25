import React from 'react';
import { Box } from '@mui/material';
import '../../assets/css/movingDotLoader.css';

const MovingDotLoader = () => (
  <Box className="moving-dot-loader">
    {Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className={`moving-dot moving-dot-dot${index + 1}`}></div>
    ))}
  </Box>
);

export default MovingDotLoader;
