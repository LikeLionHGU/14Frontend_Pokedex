import "../hanna_css/style.css";
import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../hanna_login/loginpage"; // 로그인 페이지 연결

function Home() {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);//사이드바 코드 추가

  const pageSize = 50;
  const totalPages = 2;

  const getTopSongs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://itunes.apple.com/us/rss/topsongs/limit=100/json"
      );
      setSongs(res.data.feed.entry);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  console.log(process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID);

  useEffect(() => {
    getTopSongs();
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (songId) => {
    let updated;
    if (favorites.includes(songId)) {
      updated = favorites.filter((id) => id !== songId);
    } else {
      updated = [...favorites, songId];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentSongs = songs.slice(startIndex, endIndex);

  return (
    <> <div 
        className={`shdow ${isMenuOpen ? "show" : ""}`}  onClick={() => setIsMenuOpen(false)}
      />{/*사이드바 열었을 때 어둡게*/}

      <div className={`sidebar ${isMenuOpen ? "open" : ""}`}>{/*사이드바*/}
      
      <button className="closeButton" onClick={() => setIsMenuOpen(false)}>×</button>{/*사이드바닫기*/}
      
        <div className="sidebarLogin"> {/* 로그인 버튼 이동*/}
            <Login /> 
        </div>
        <ul className="sideMenu">
            <li onClick={() => setIsMenuOpen(false)}>인기차트</li>
            <li onClick={() => setIsMenuOpen(false)}>마이페이지</li>
        </ul>{/*사이드바 메뉴*/ }
      </div>

      <div className="headerBox">  {/*헤더 영역 박스로 묶기(메뉴바+로고)*/}
        <button className="menuButtton" onClick={() => setIsMenuOpen(true)}>
      ☰
        </button>
        <button className="reloding" onClick={() => window.location.reload()}>{/*로고 버튼에 새로고침기능추가*/}
           <h1 className="logo">MUSIC</h1>
        </button>
      </div>

      <h2 className="top">
        {currentPage === 1 && "TOP 50"}
        {currentPage === 2 && "TOP 100"}
      </h2>

      {loading && <p>Loading...</p>}

      <ul className="listStyle">
        {currentSongs.map((song, index) => {
          const songId = song.id.attributes["im:id"];
          const isFav = favorites.includes(songId);

          return (
            <li key={songId} className="chartBox">
              <span className="rank">{startIndex + index + 1}</span>
              <img
                className="albumCover"
                src={song["im:image"][2].label}
                alt="Album Cover"
              />
              <div className="songInfo">
                <span className="title">{song["im:name"].label}</span>
                <span className="artist">{song["im:artist"].label}</span>
              </div>
              <button
                className="starBtn"
                onClick={() => toggleFavorite(songId)}
              >
                {isFav ? "⭐" : "☆"}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="buttonLoc">
        {[1, 2].map((page) => (
          <button
            className="pageButton"
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              color: page === currentPage ? "#9deb69" : "#333",
              fontWeight: "normal",
              marginRight: "5px",
            }}
          >
            {page * 50 - 49}~{page * 50}
          </button>
        ))}
      </div>
    </>
  );
}

export default Home;