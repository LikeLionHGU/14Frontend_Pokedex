import { useEffect,useState } from "react";
import axios from "axios";

function Home(){
    const [loading, setLoading] =useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [nextUrl, setNextUrl] = useState("https://pokeapi.co/api/v2/pokemon");

    const totalPages= 52;

    const getPokeMon = async(page) => {
        const offset = (page-1)*20;
        setLoading(true);
        
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`);
        setPokemons(res.data.results);
        console.log(res.data.results);
    }

    useEffect(()=>{
        getPokeMon(currentPage);
    },[currentPage]);

     return (
    <>
      <ul>
        {pokemons.map(p => (
          <li key={p.name}>{p.name}</li>
        ))}
      </ul>

      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal"
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}

export default Home;