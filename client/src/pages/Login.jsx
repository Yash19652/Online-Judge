import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Alert from '@mui/material/Alert';
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState ,useContext} from "react";
const defaultTheme = createTheme();
import backgroundImage from '../assets/loginBg.png'; 
import { UserContext } from '../components/UserContext';
import { styled } from '@mui/system';

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

const textFieldStyles = {
  '& .MuiInputBase-input': {
    color: 'white', // Text color
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Label color
    '&.Mui-focused': {
      color: 'white', // Label color when focused
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Border color when focused
    },
  },
};

const styles = {
  label: {
    color: '#ffffff',
    '&.Mui-focused': {
      color: '#ffffff',
    },
  },
  radio: {
    color: '#ffffff',
    '&.Mui-checked': {
      color: '#ffffff',
    },
    '&.MuiRadio-root': {
      color: '#ffffff',
    },
  },
  formControlLabel: {
    color: '#ffffff',
    '& .MuiFormControlLabel-label': {
      color: '#ffffff',
    },
  },
};


export default function Login() {

  const { setUserData } = useContext(UserContext);

  const location = useLocation()
  const [alertMsg,setAlertMsg] = useState(location.state ? location.state.msg : null)
  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => {
        alert(alertMsg);
        setAlertMsg(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);
  
  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const data = Object.fromEntries(formData);
    //  console.log(data);
    
    const res = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, data , {withCredentials:true})
      .then(function (response) {
        if (response.status) {
          const recievedUserData = response.data.user;
          setUserData(recievedUserData);
          navigate("/");
          // alert(response.data.message)
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.error);
        

        // <Alert severity="error">{error.response.data.error}</Alert>
      });

    return res;
  };

  return (
    <Background>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{backgroundColor: "rgba(0, 0, 0, 0.178)",backdropFilter:"blur(10px)",color:"white", paddingBottom:2 ,border:"1px solid white" , borderRadius:2}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            SIGN IN
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  sx={textFieldStyles}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="role" sx={styles.label}>
                    Role
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="role"
                    name="role"
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                      sx={styles.formControlLabel}
                    />
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      sx={styles.formControlLabel}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-start">
              <Grid item>
                <Link to="/sign-up" style={{ color: 'white' }}>Dont have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
    </Background>
  );
}
