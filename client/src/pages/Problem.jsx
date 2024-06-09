import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import CodeEditor from "../components/CodeEditor";
import { useLocation } from "react-router-dom";
import ProblemDetails from "../components/ProblemDetails";
import backgroundImage from "../assets/compilerBg.jpg"
import { styled } from '@mui/system';

const Problem = () => {
  const location = useLocation();
  const recievedData = location.state.problemData || {};
  // console.log(recievedData);
  return (
    <>
    <div>
      <Box
        sx={{
          // margin: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor:"#DBE2EF",
          minHeight: "100vh",
          backgroundImage:`url(${backgroundImage})`
        }}
      >
        <Grid container spacing={2}>
          
          {/* left section */}
          <Grid item xs={12} md={6}>
            <ProblemDetails recievedData={recievedData} />
          </Grid>

          {/* right section */}

          <Grid item xs={12} md={6}>
            <CodeEditor recievedData={recievedData}/>
          </Grid>
        </Grid>
      </Box>
    </div>
    </>
  );
};

export default Problem;
