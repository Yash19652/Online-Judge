import React, { useRef, useState } from "react";
import { Box, Grid } from "@mui/material";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../utils/constants";
import Result from "./Result";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField } from "@mui/material";
import Axios from "axios";

const CodeEditor = () => {
  const editorRef = useRef();

  const [lang, setLang] = useState("cpp");
  const [code, setCode] = useState(CODE_SNIPPETS[lang]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLangChange = (language) => {
    setLang(language);
    setCode(CODE_SNIPPETS[language]);
  };
  const handleCodeChange = (value) => {
    setCode(value);
  };

  const [tabValue, setTabValue] = useState("1");
  const [input, setInput] = useState("");
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [output, setOutput] = useState("Output");

  Axios.defaults.withCredentials = true;
  const handleRun = async () => {
    try {
      var toSendLang = lang;
      if(lang ==='python'){
        toSendLang="py"
      }
      const res = await Axios.post(
        "http://localhost:5000/solve/run",
        {
          language: toSendLang,
          code: code,
          input: input,
        },
        { withCredentials: true }
      );

      setTabValue("2");
      setOutput(res.data.output);
    } catch (error) {
      setTabValue("2");
      setOutput("ERROR IN CODE")
      console.log(error);
    }
  };

  return (
    <Box>
      {/* language selection */}
      <LanguageSelector language={lang} onSelect={handleLangChange} />

      {/* code editor */}
      <Editor
        height="75vh"
        theme="vs-dark"
        language={lang}
        defaultValue={CODE_SNIPPETS[lang]}
        onMount={onMount}
        value={code}
        onChange={handleCodeChange}
      />
      <Stack
        spacing={2}
        direction="row"
        sx={{ marginY: 1, justifyContent: "center" }}
      >
        {/* run-submit button */}
        <Button
          variant="contained"
          sx={{ margin: 1, marginX: "auto", width: "calc(50% - 8px)" }}
          onClick={handleRun}
        >
          RUN
        </Button>
        <Button
          variant="contained"
          sx={{ margin: 1, marginX: "auto", width: "calc(50% - 8px)" }}
        >
          SUBMIT
        </Button>
      </Stack>

      {/* i/p o/p verdict */}
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
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
              value={output}
              InputProps={{
                readOnly: true,
              }}
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
              InputProps={{
                readOnly: true,
              }}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default CodeEditor;
