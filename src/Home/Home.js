import "../hanna_css/style.css";
import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../hanna_login/loginpage";//로그인 페이지 연결

function Home() {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const pageSize = 50;
  const totalPages = 2;

  useEffect(() => {
  const token = localStorage.getItem("accessToken");
  setIsLogin(!!token);
}, []);

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


  useEffect(() => {
    getTopSongs();
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (songId) => {
    let updated;
    if (favorites.includes(songId)) {
      updated = favorites.filter(id => id !== songId);
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
    <>
      
      <div className="loginLoc">
          {!isLogin ? (
            <Login />
          ) : (
            <button
              className="mypageButton"
              onClick={() => navigate("/mypage")}
            >
              마이페이지
            </button>
          )}
      </div>
      <button className="reloding">{/*버튼 추가 새로고침용도*/}
      <h1 className="logo">MUSIC</h1>
      </button>

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
              marginRight: "5px"
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
