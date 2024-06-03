import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import CodeEditor from "../components/CodeEditor";
import { useLocation } from "react-router-dom";

const Problem = () => {
  const location = useLocation();
  const recievedData = location.state.problemData || {};
  // console.log(recievedData);
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
            {<h5>{recievedData.probName}</h5>}
            {<h5>{recievedData.probStatement}</h5>}
            {recievedData.ex_TC.map((TC) => (
              <div key={TC.id}>
                <h5>{TC.input}</h5>
                <h5>{TC.output}</h5>
              </div>
            ))}
          </Grid>

          {/* right section */}
          <Grid item xs={12} md={6}>
            {/* code editor */}
            <CodeEditor />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Problem;
