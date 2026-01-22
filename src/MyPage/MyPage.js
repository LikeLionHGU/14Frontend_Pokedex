import "./MyPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";

function MyPage() {
  const [user, setUser] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favoriteIds.length > 0) {
      fetchFavoriteSongs(favoriteIds);
    }
  }, []);

  const fetchFavoriteSongs = async (ids) => {
    try {
      const res = await axios.get("https://itunes.apple.com/lookup", {
        params: {
          id: ids.join(","),
          country: "US"
        }
      });
      setSongs(res.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const removeFavorite = (trackId) => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];
    const updated = stored.filter(id => id !== String(trackId));

    localStorage.setItem("favorites", JSON.stringify(updated));
    setSongs(prev => prev.filter(song => song.trackId !== trackId));
  };

  return (
    <>
    <Header/>
    <div className="mypageContainer">
      {user && (
        <div className="profileBox">
          <img src={user.picture} alt="profile" className="profileImg" />
          <div className="profileInfo">
            <p className="profileName">{user.name}</p>
            <p className="profileEmail">{user.email}</p>
          </div>
        </div>
      )}

      <h2 className="likeTitle">⭐ 내가 좋아요한 노래</h2>

      {songs.length === 0 && (
        <p className="emptyText">좋아요한 노래가 없습니다.</p>
      )}

      <ul className="likeList">
        {songs.map(song => (
          <li key={song.trackId} className="likeItem">
            <img
              src={song.artworkUrl100}
              alt="album"
              className="likeAlbum"
            />
            <div className="likeInfo">
              <span className="likeSong">{song.trackName}</span>
              <span className="likeArtist">{song.artistName}</span>
            </div>
            <button
              className="removeBtn"
              onClick={() => removeFavorite(song.trackId)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default MyPage;
