import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/homeBg.jpg'; 
import { UserContext } from "../components/UserContext";
import { useContext } from 'react';

const Background = styled(Box)({
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const Text = styled(Typography)({
  position: 'absolute',
  color: 'darkblue',
  fontSize: '1.2rem',
  fontWeight: 'bold', // Make the text bolder
});

const ButtonLeft = styled(Button)({
  position: 'absolute',
  top: '12%', // Adjust this value to position the button on the left hand
  left: '30%', // Adjust this value to position the button on the left hand
  padding: '23px 20px', // Increase the padding for a larger button
  fontSize: '1rem', // Increase the font size
  fontWeight: 'bold', // Make the font bolder
});

const ButtonRight = styled(Button)({
  position: 'absolute',
  top: '27%', // Adjust this value to position the button on the right hand
  right: '27%', // Adjust this value to position the button on the right hand
  padding: '12px 22px', // Increase the padding for a larger button
  fontSize: '1rem', // Increase the font size
  fontWeight: 'bold', // Make the font bolder
});

const TextLeft = styled(Text)({
  top: '8%', // Adjust this value to position the text above the left button
  left: '29%', // Adjust this value to position the text above the left button
});

const TextRight = styled(Text)({
  top: '20%', // Adjust this value to position the text above the right button
  right: '27%', // Adjust this value to position the text above the right button
});

const TextCenter = styled(Text)({
  top: '40%', // Adjust this value to position the text above the right button
  right: '43%', // Adjust this value to position the text above the right button
});
const ButtonCenter = styled(Button)({
  position: 'absolute',
  top: '45%', // Adjust this value to position the button on the right hand
  right: '46%', // Adjust this value to position the button on the right hand
  padding: '17px 47px', // Increase the padding for a larger button
  fontSize: '1rem', // Increase the font size
  fontWeight: 'bold', // Make the font bolder
});

const Home = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Background>
      {!userData ? 
      <>
      <TextLeft>Already a user?</TextLeft>
      <ButtonLeft variant="contained" color="primary" onClick={() => navigate('/login')}>
        Login
      </ButtonLeft>
      <TextRight>New user?</TextRight>
      <ButtonRight variant="contained" color="secondary" onClick={() => navigate('/sign-up')}>
        Sign Up
      </ButtonRight>
      </> : <>
      <TextCenter>Solve our curated questions</TextCenter>
      <ButtonCenter variant="contained" color="primary" onClick={() => navigate('/problemlist')}>
        Practice
      </ButtonCenter>
      </>
      }
    </Background>
  );
};

export default Home;
