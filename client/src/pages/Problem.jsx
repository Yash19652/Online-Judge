import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Problem = () => {
  const [lang, setLang] = useState("");
  const handleLang = (event) => {
    setLang(event.target.value);
  };
  const[code,setCode] = useState("")
  const handleChange = (e) => {
    setCode(e);
  };
  return (
    <div>
      <Box
        sx={{
          margin: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid black",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={2}>
          {/* left section */}
          <Grid item xs={12} md={6}>
            {lang}
          </Grid>

          {/* right section */}
          <Grid item xs={12} md={6}>
            {/* language */}
            <Grid border="1px solid black">
              <Box
                sx={{
                  minWidth: "120",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormControl sx={{ width: 0.5, marginY: 1 }}>
                  <InputLabel id="language">Language</InputLabel>
                  <Select
                    labelId="language"
                    id="language"
                    value={lang}
                    label="Language"
                    onChange={handleLang}
                  >
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="CPP">CPP</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Editer language={lang} />
            </Box> */}
            

            <Grid border="1px solid black" marginY={1}>
            </Grid>

            {/* run n submit */}
            <Grid border="1px solid black">hello</Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Problem;
