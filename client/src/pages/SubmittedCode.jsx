import React from "react";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { Box } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const submittedCode = () => {
  const location = useLocation();
  const code = location.state.code || {};
  const language = location.state.language || {};
  const editorRef = useRef();
  const navigate = useNavigate()
  const lang = language==="py" ? "python" : language;
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const goBack = ()=>{
    navigate(-1);
  }
  return (
    <>
      <Box sx={{ marginX: 10, marginTop: 5 }}>
        <Button
          variant="contained"
          sx={{ margin: 1, marginX: "auto", width: "10%" }}
          onClick={goBack}
          endIcon={<ArrowBackIcon/>}
        >
          Back 
        </Button>
        {/* code editor */}
        <Editor
          height="65vh"
          theme="vs-dark"
          language={lang}
          onMount={onMount}
          value={code}
          readOnly:true
        />
      </Box>
    </>
  );
};

export default submittedCode;
