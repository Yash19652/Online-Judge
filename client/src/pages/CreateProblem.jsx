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
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";


import Axios from "axios";
import { Divider, Chip } from "@mui/material";


const defaultTheme = createTheme();

export default function CreateProblem() {
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData);
    console.log("In frontend",data);

    const res = await Axios.post(
      "http://localhost:5000/problemlist/create",
      data,
      { withCredentials: true }
    )
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
        // alert();

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
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EditNoteSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a Problem
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 5 }}
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
                  minRows={4}
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="companyAsked"
                  label="Company Asked"
                  name="companyAsked"
                  autoComplete="Company Asked"
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              CREATE
            </Button>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
