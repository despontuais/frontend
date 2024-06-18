// src/components/Footer.js
import React from 'react';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const FooterContainer = styled('footer')({
  backgroundColor: '#2A2A2A',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px', // Para empurrar o footer para baixo
  color: '#fff',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Typography variant="body1">© 2024 Cronolog Website. All Rights Reserved.</Typography>
    </FooterContainer>
  );
};

export default Footer;
