import React from 'react';
import { Box, Stack , Typography} from '@mui/material';

const Footer = () => (
  <Box mt="80px" bgcolor="#FEB079">
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
    </Stack>
    <Typography variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }, {color: "white"}} mt="41px" textAlign="center" pb="40px">&copy; 2025  Natalia Sokolova</Typography>
  </Box>
);

export default Footer;
