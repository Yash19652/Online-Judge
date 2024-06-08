import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Axios from "axios";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Heading = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  height: 60,
  lineHeight: "60px",
  margin: 10,
  fontSize: 20,
}));

const Statement = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // color: theme.palette.text.secondary,
  minHeight: 160,
  margin: 10,
  padding: 2,
}));

const Texts = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // color: theme.palette.text.secondary,
  minHeight: 60,
  margin: 10,
  padding: 2,
}));

const Examples = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  margin: 10,
  padding: 2,
  backgroundColor: "#DDDDDD",
  minHeight: 60,
  // display: "flex",
  width: "80%",
}));

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const renderTextWithNewlines = (text) => {
  return text.split("\n").map((line, index) => (
    <Stack direction="column" key={index}>
      {line}
      <br />
    </Stack>
  ));
};

// const getSubmissions = async (probId) => {
//   // console.log(probId, userData.email);
//   try {
//     const res = await Axios.post(
//       `${import.meta.env.VITE_BACKEND_URL}/getSubmissions`,
//       { probId: probId },
//       {
//         withCredentials: true,
//       }
//     );
//     console.log(res.data);
//     const data = res.data;
//     navigate("/submission", { state: { data } });


//   } catch (error) {
//     console.log(error);
//     alert("error in getting submissions");
//   }
// };

const ProblemDetails = ({ recievedData }) => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate()

  const getSubmissions = async (probId) => {
    // console.log(probId, userData.email);
    try {
      const res = await Axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/getSubmissions`,
        { probId: probId },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      navigate("/submission", { state: { data } });
  
  
    } catch (error) {
      console.log(error);
      alert("error in getting submissions");
    }
  };

  return (
    <>
      
      <Grid spacing={2}>
        <Heading variant="outlined">{recievedData.probName}</Heading>
        
        <Stack direction="row" spacing={1}>
          {recievedData.companyAsked.map((company, index) => (
            <Chip label={company} key={index} sx={{backgroundColor:"grey"}}/>
          ))}
        </Stack>

        <Button
            variant="contained"
            sx={{ marginY: 2, marginX:1.5, width: "30%" }}
            onClick={() => getSubmissions(recievedData.probId)}
          >
            Submissions
          </Button>

        <Statement variant="outlined">{recievedData.probStatement}</Statement>

        {recievedData.ex_TC.map((TC, index) => (
          <>
            {`Example ${index + 1}`}
            <br />
            <br />
            <Divider />
            <Grid sx={{ backgroundColor: "#EEEEEE", borderRadius:1, margin:2}} key={index}>
              <Grid container spacing={1} sx={{marginLeft:1}}>
                <Grid item xs={1} sx={{ alignContent: "center"}}>
                  {"Input"}
                </Grid>
                <Grid item xs={11}>
                  <Examples>{renderTextWithNewlines(TC.input)}</Examples>
                </Grid>
              </Grid>

              <Grid container spacing={1} sx={{marginLeft:1}}>
                <Grid item xs={1} sx={{ alignContent: "center" }}>
                  {"Output"}
                </Grid>
                <Grid item xs={11}>
                  <Examples>{renderTextWithNewlines(TC.output)}</Examples>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <br />
          </>
        ))}
      </Grid>
    </>
  );
};

export default ProblemDetails;
