import React, { useState } from 'react';
import { Box, Typography} from '@mui/material';
import { Link } from 'react-router-dom';


import HeroBannerImage from '../assets/images/banner.jpg';
const Home = () => {


  return (
    <Box sx={{ mt: { lg: '20px', xs: '70px' }}} position="relative" p="20px">
    <Typography color="" textAlign="center" fontWeight="600" fontSize="26px">ActiveMind </Typography>
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' } }}  textAlign="center" mb="23px" mt="30px">
    Your body can stand almost anything. <br />
    It’s your mind that you have to convince.
    </Typography>
    <Typography textAlign="center" fontSize="22px" fontFamily="Alegreya" lineHeight="35px" style={{marginBottom: '20px'}} >
      Check out the most effective exercises personalized to you
    </Typography>


    <img src={HeroBannerImage} alt="hero-banner" className="hero-banner-img" style={{ maxWidth: "100%", height: "auto", textAlign: "center" }}/>
    <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '30px' } }} style={{marginTop: '30px'}} mb="49px" textAlign="center" >
        Awesome Exercises You <br /> Should Know
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

      <Link 
       to="/exercises" 
       style={{ padding:"15px", marginTop: '10px', textDecoration: 'none', width: '200px', textAlign: 'center', background: '#7BC6FF', fontSize: '22px', textTransform: 'none', color: 'white', borderRadius: '4px' }}>Explore Exercises
    </Link>
    </div>
      
  </Box>



  );
};

export default Home;