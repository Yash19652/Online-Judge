import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProblemList from "./pages/ProblemList";
import UpdateProblem from "./pages/UpdateProblem";
import CreateProblem from "./pages/CreateProblem";
import Problem from "./pages/Problem";
import { UserProvider } from "./components/UserContext";
import SubmissionPage from "./pages/SubmissionPage";
import SubmittedCode from './pages/SubmittedCode';



function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/problemlist" element={<ProblemList />} />
            <Route path="/updateproblem" element={<UpdateProblem />} />
            <Route path="/createproblem" element={<CreateProblem />} />
            <Route path="/problem/:ID" element={<Problem />} />
            <Route path="/submission" element={<SubmissionPage />} />
            <Route path="/submittedcode" element={<SubmittedCode />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
