import React, { useRef, useState ,useEffect ,useContext} from "react";
import { Box ,TextField ,Chip ,InputAdornment ,Tab ,Stack ,Button} from "@mui/material";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../utils/constants";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Axios from "axios";
import { UserContext } from "./UserContext";


const CodeEditor = ({ recievedData }) => {

  const editorRef = useRef();
  const targetRef = useRef(null);
  const { userData ,setUserData } = useContext(UserContext);
  const [lang, setLang] = useState("cpp");
  const [verdict, setVerdict] = useState([]);
  const [verdictMessage,setVerdictMessage] = useState("")
  const [tabValue, setTabValue] = useState("1");
  const [input, setInput] = useState(recievedData.ex_TC[0].input);
  const [output, setOutput] = useState("");
  
  // const [code, setCode] = useState(CODE_SNIPPETS[lang]);

  const [code, setCode] = useState(() => {
    const savedCode 
    = recievedData.probId === localStorage.getItem('probId') 
    ? localStorage.getItem('code') 
    : null;
    return savedCode ? savedCode : CODE_SNIPPETS[lang];
  });

  useEffect(() => {
    localStorage.setItem('code', code);
    localStorage.setItem('probId', recievedData.probId);
  }, [code]);

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

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  Axios.defaults.withCredentials = true;
  const handleRun = async () => {
    try {
      var toSendLang = lang;
      if (lang === "python") {
        toSendLang = "py";
      }
      const res = await Axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/solve/run`,
        {
          language: toSendLang,
          code: code,
          input: input,
          probId: recievedData.probId,
        },
        { withCredentials: true }
      );
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setTabValue("2");
      setOutput(res.data.output);
    } catch (error) {
      setTabValue("2");
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setOutput(error.response.data.error);
      console.log(error);
    }
  };

  const handleVerdict = (Result) => {
    const pass = Result.verdict;
    const N = Result.lineNo;
    const verdictArray = [];
    for (let i = 1; i <= N; i++) {
      verdictArray.push({
        label: `TESTCASE${i}`,
        color: pass || i < N ? "success" : "error",
      });
    }
    setVerdict(verdictArray);
    if (pass) {
      setVerdictMessage("All test cases passed.");
  } else {
      setVerdictMessage(`Failed at TESTCASE${N}.`);
  }
  };

  const renderChips = () => (
    <Box>
      {verdictMessage}
    <Stack direction="row" spacing={1}>
        {verdict.map((testCase, index) => (
            <Chip
                key={index}
                label={testCase.label}
                color={testCase.color}
                sx={{ borderRadius: 1 }}
            />
        ))}
    </Stack>
    </Box>
);

  const handleSubmit = async () => {
    try {
      var toSendLang = lang;
      if (lang === "python") {
        toSendLang = "py";
      }
      const res = await Axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/solve/submit`,
        {
          language: toSendLang,
          code: code,
          probId: recievedData.probId,
        },
        { withCredentials: true }
      );
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setTabValue("3");
      const Result = res.data.result;
      handleVerdict(Result);

      const probId = recievedData.probId;
      if(Result.verdict)
        {
          if (!userData.solvedProblems.includes(probId)) 
            {
            setUserData(prevUserData => ({
                ...prevUserData,
                solvedProblems: [...prevUserData.solvedProblems, probId]
            }));
        }
      }


      // setOutput(res);
    } catch (error) {
      setTabValue("3");      
      if (targetRef.current) {
        targetRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setVerdict([]);
      setVerdictMessage("Error in code")
      // console.log(error);
    }
  };

  return (
    <Box>
      {/* language selection */}
      <LanguageSelector language={lang} onSelect={handleLangChange} />

      {/* code editor */}
      <Editor
        height="65vh"
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
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </Stack>

      {/* i/p o/p verdict */}
      <Box ref={targetRef} sx={{ width: "100%", typography: "body1"}}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
              
            >
              <Tab label="INPUT" value="1" sx={{ color: 'white', fontWeight: 'bold' }} />
              <Tab label="OUTPUT" value="2" sx={{ color: 'white', fontWeight: 'bold' }}/>
              <Tab label="VERDICT" value="3" sx={{ color: 'white', fontWeight: 'bold' }}/>
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
              sx={{backgroundColor:"white"}}
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
              sx={{backgroundColor:"white"}}
            />
          </TabPanel>
          <TabPanel value="3">
            <TextField
              hiddenLabel
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value=""
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                      {renderChips()}
                  </InputAdornment>
              ),
              }}
              sx={{backgroundColor:"white"}}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default CodeEditor;
