import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import {Chip ,Divider} from '@mui/material'
import Axios from "axios";

const defaultTheme = createTheme();

export default function UpdateProblem() {
  const navigate = useNavigate();

  const location = useLocation();
  const recievedData = location.state.problemDetails || {};
  console.log(recievedData)

  Axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);
    
    data._id = recievedData._id
    // console.log(data);
    const res = await Axios.post(`${import.meta.env.VITE_BACKEND_URL}/problemlist/update`, data , {withCredentials:true})
      .then(function (response) {
        if (response.status) {
          console.log(response);
          navigate("/problemlist");
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

    // return res;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditNoteSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit The Problem
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5}}
          >
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  required
                  fullWidth
                  id="probId"
                  label="Problem ID"
                  name="probId"
                  autoComplete="Problem ID"
                  defaultValue={recievedData.probId}
                  InputProps={{
                    readOnly:true,
                  }}  
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  name="probName"
                  label="Problem Name"
                  id="probName"
                  autoComplete="Problem Name"
                  defaultValue={recievedData.probName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="probStatement"
                  label="Problem Statement"
                  name="probStatement"
                  autoComplete="Problem Statement"
                  multiline
                  rows={4}
                  defaultValue={recievedData.probStatement}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="difficulty"
                  label="Difficulty"
                  name="difficulty"
                  autoComplete="Difficulty"
                  defaultValue={recievedData.difficulty}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="topic"
                  label="Topic"
                  name="topic"
                  autoComplete="Topic"
                  defaultValue={recievedData.topic}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="companyAsked"
                  label="Company Asked"
                  name="companyAsked"
                  autoComplete="Company Asked"
                  defaultValue={recievedData.companyAsked.join(',')}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="input1"
                  label="Example 1 Inputs"
                  name="input1"
                  autoComplete="Example 1 Inputs"
                  defaultValue={recievedData.ex_TC[0].input}
                  multiline
                  
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="output1"
                  label="Example 1 Outputs"
                  name="output1"
                  autoComplete="Example 1 Outputs"
                  defaultValue={recievedData.ex_TC[0].output}
                  multiline
                  
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="input2"
                  label="Example 2 Inputs"
                  name="input2"
                  autoComplete="Example 2 Inputs"
                  defaultValue={recievedData.ex_TC[1].input}
                  multiline
                  
                />
                <TextField
                  margin="dense"
                  required
                  fullWidth
                  id="output2"
                  label="Example 2 Outputs"
                  name="output2"
                  autoComplete="Example 2 Outputs"
                  defaultValue={recievedData.ex_TC[1].output}
                  multiline
                
                />
              </Grid>

              <Grid item xs={12}>
                <Divider>
                  <Chip label="Test Cases" size="small" />
                </Divider>
              </Grid>


              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="TCinput"
                  label="Test Case Input"
                  name="TCinput"
                  autoComplete="Test Case Input"
                  multiline
                  minRows={2}
                  defaultValue={recievedData.TC.TCinput}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="TCoutput"
                  label="Test Case Output"
                  name="TCoutput"
                  autoComplete="Test Case Output"
                  multiline
                  minRows={2}
                  defaultValue={recievedData.TC.TCoutput}
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              UPDATE
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
