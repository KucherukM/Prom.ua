import React, { useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import { BrokenImage } from '@mui/icons-material';

interface ImageLoaderProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  sx?: any;
  fallbackSrc?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  sx = {},
  fallbackSrc = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <Box sx={{ position: 'relative', width, height, ...sx }}>
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      )}
      
      {error ? (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            border: '1px solid #e0e0e0',
            borderRadius: 1,
          }}
        >
          <BrokenImage sx={{ fontSize: 48, color: '#ccc', mb: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Зображення не знайдено
          </Typography>
        </Box>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: loading ? 'none' : 'block',
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </Box>
  );
};

export default ImageLoader;
