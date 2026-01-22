import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./hanna_css/style.css";
import Home from "./Home/Home"; 
import Loading from "./hanna_login/loding"; 
import TestPage from "./hanna_login/testpage"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/loading" element={<Loading />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;