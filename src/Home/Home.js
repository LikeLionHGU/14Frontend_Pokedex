import "../hanna_css/style.css";//Css 연결
import {useEffect,useState} from "react";
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
    <h1 className="logo">MUSIC</h1>
      <h2 className="top">{/*~꼴이던거 탑 꼴로 수정했씁니다!*/}
        {currentPage === 1 && "TOP 50"}
        {currentPage === 2 && "TOP 100"}
        {currentPage === 3 && "TOP 150"}
        {currentPage === 4 && "TOP 200"}
      </h2>

      {loading && <p>Loading...</p>}

      
       


<ul className="listStyle">{/*전체 테마 클래스 네임 선언*/}
  {currentSongs.map((song, index) => (
  <li key={index} className="chartBox">
  <span className="rank">{startIndex +index + 1}</span>  {/*음원차트순위(내림차)*/}
    <img className="albumCover" src={song["im:image"][2].label} alt="Album Cover" />{/*음원차트용 이미지 추가로 불러오기+이미지사이즈중간*/ }

      {/*노래 제목/가수*/}
  <div className="songInfo">
 <span className="title">{song["im:name"].label}</span>
      <span className="artist">{song["im:artist"].label}</span>
           </div>
          </li>
        ))}
      </ul>
      
     


      <div className="buttonLoc">
        {[1, 2, 3, 4].map((page) => (
          <button className="pageButton"
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              color: page === currentPage ? "#9deb69" : "#333",
              fontWeight: page === currentPage ? "normal" : "normal",
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
