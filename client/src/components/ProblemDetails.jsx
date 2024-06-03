import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

const ProblemDetails = ({ recievedData }) => {
  return (
    <>
      <Grid spacing={2}>
        <Heading variant="outlined">{recievedData.probName}</Heading>

        <Stack direction="row" spacing={1}>
          {recievedData.companyAsked.map((company,index)=>(
            <Chip label={company} key={index}/>
          ))}
          
        </Stack>

        <Statement variant="outlined">{recievedData.probStatement}</Statement>

        {recievedData.ex_TC.map((TC, index) => (
          <>
            {`Example ${index + 1}`}
            <br />
            <br />
            <Divider />
            <Grid sx={{backgroundColor:"#EEEEEE" , borderRadius:"2"}}>
            <Grid container spacing={1} >
              <Grid item xs={1} sx={{ alignContent: "center" }}>
                {"Input"}
              </Grid>
              <Grid item xs={11}>
                <Examples>{TC.input}</Examples>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={1} sx={{ alignContent: "center" }}>
                {"Output"}
              </Grid>
              <Grid item xs={11}>
                <Examples>{TC.output}</Examples>
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
