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

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/problemlist" element={<ProblemList />} />
          <Route path="/updateproblem" element={<UpdateProblem />} />
          <Route path="/createproblem" element={<CreateProblem />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
