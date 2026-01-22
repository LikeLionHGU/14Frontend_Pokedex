import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../hanna_login/loginpage";
import "./Header.css";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("favorites");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="header">
      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        MUSIC
      </div>

      <div className="headerRight">
        {!isLogin ? (
          <Login />
        ) : (
          <>
            <button
              className="headerBtn"
              onClick={() => navigate("/mypage")}
            >
              마이페이지
            </button>
            <button
              className="headerBtn logout"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
