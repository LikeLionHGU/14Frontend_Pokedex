import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./hanna_css/style.css";
import Home from "./Home/Home"; 
import Loading from "./hanna_login/loding"; 
import TestPage from "./hanna_login/testpage"; 
import MyPage from "./MyPage/MyPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="mypage" element={<MyPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;