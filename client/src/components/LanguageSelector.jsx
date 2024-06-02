import React from 'react'
import { Box, Grid } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from 'react';
import { LANGUAGE_VALUES } from '../utils/constants';

const languages = Object.entries(LANGUAGE_VALUES)

const LanguageSelector = ({language,onSelect}) => {

  const [lang, setLang] = useState("cpp");
  const handleLang = (event) => {
    setLang(event.target.value);
  };
  return (
    <Grid>
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
                    {
                        languages.map(([language,value])=>(
                            <MenuItem key ={value} value={value} onClick={() => onSelect(value)}>{language}</MenuItem>
                        ))
                    }
                  </Select>
                </FormControl>
              </Box>
            </Grid>
  )
}

export default LanguageSelector