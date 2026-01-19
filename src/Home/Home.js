import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 50;
  const totalPages = 4;

  const getTopSongs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://itunes.apple.com/us/rss/topsongs/limit=50/json"
      );

      setSongs(res.data.feed.entry);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  console.log("songs length:", songs.length);

  useEffect(() => {
    getTopSongs();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const currentSongs = songs.slice(startIndex, endIndex);

  return (
    <>
      <h2>
        {currentPage === 1 && "1 ~ 50"}
        {currentPage === 2 && "51 ~ 100"}
        {currentPage === 3 && "101 ~ 150"}
        {currentPage === 4 && "151 ~ 200"}
      </h2>

      {loading && <p>로딩중...</p>}

      <ul>
        {currentSongs.map((song, index) => (
          <li key={index}>
            {startIndex + index + 1}. {song["im:name"].label}
          </li>
        ))}
      </ul>

      <div>
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              color: page === currentPage ? "red" : "black",
              fontWeight: page === currentPage ? "bold" : "normal",
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
