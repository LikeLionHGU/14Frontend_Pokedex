import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../hanna_login/loginpage";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("favorites");
    setIsLogin(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* 사이드바 열렸을 때 어두운 배경 */}
      <div
        className={`shdow ${isMenuOpen ? "show" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* 사이드바 */}
      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>
        <button
          className="closeButton"
          onClick={() => setIsMenuOpen(false)}
        >
          ×
        </button>

        {/* 로그인 / 로그아웃 영역 */}
        <div className="sidebarLogin">
          {!isLogin ? (
            <Login />
          ) : (
            <button
              className="logoutBtn"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          )}
        </div>

        {/* 메뉴 */}
        <ul className="sideMenu">
          <li
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            인기차트
          </li>
          {isLogin && (
            <li
              onClick={() => {
                navigate("/mypage");
                setIsMenuOpen(false);
              }}
            >
              마이페이지
            </li>
          )}
        </ul>
      </div>

      {/* 헤더 */}
      <div className="headerBox">
        <button
          className="menuButtton"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>

        <button
          className="reloding"
          onClick={() => navigate("/")}
        >
          <h1 className="logo">MUSIC</h1>
        </button>
      </div>
    </>
  );
}

export default Header;
