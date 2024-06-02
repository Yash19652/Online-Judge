import {useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextField } from '@mui/material';

export default function Result() {
  const [tabValue, setTabValue] = useState('1');
  const [input,setInput] = useState('');

  const handleInput = (event, value) => {
    setInput(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="INPUT" value="1" />
            <Tab label="OUTPUT" value="2" />
            <Tab label="VERDICT" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
        <TextField
          hiddenLabel
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          defaultValue="input"
          value={input}
          onChange={handleInput}
        />
        </TabPanel>
        <TabPanel value="2">
        <TextField
          hiddenLabel
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value="output"
        />
        </TabPanel>
        <TabPanel value="3">
        <TextField
          hiddenLabel
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value="verdict"
        />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
