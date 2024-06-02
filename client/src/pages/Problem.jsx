import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import CodeEditor from "../components/CodeEditor"


const Problem = () => {
   
  return (
    <div>
      <Box
        sx={{
          margin: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // border: "1px solid black",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2}>
          {/* left section */}
          <Grid item xs={12} md={6}>
            left side
          </Grid>

          {/* right section */}
          <Grid item xs={12} md={6}>
            {/* language */}
            
            

            {/* code editor */}
            <CodeEditor />
            

            <Grid  marginY={1}>
            </Grid>

            {/* run n submit */}
            <Grid ></Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Problem;
