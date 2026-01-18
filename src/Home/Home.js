import { useEffect,useState } from "react";
import axios from "axios";

function Home(){
    const [loading, setLoading] =useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [currentPage,setCurrentPage]=useState(1);

    const totalPages= 52;
    const pagesPerGroup = 10;
    const currentGroup = Math.ceil(currentPage/pagesPerGroup);
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(
        startPage+pagesPerGroup - 1,
        totalPages
    );

    const getPokeMon = async (page) => {
        const offset = (page - 1) * 20;
        setLoading(true);

        try {
            const res = await axios.get(
            `https://pokeapi.co/api/v2/pokemon?offset=${offset}`
            );

            const detailPromises = res.data.results.map(p =>
            axios.get(p.url)
            );

            const detailResponses = await Promise.all(detailPromises);

            const mappedPokemons = detailResponses.map(r => ({
            id: r.data.id,
            name: r.data.name,
            types: r.data.types.map(t => t.type.name),
            height: r.data.height / 10,
            weight: r.data.weight / 10,
            abilities: r.data.abilities.map(a => a.ability.name),
            image:
                r.data.sprites.other["official-artwork"].front_default
                || r.data.sprites.front_default
            }));

            setPokemons(mappedPokemons);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

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
            {startPage > 1 && (
                <button onClick={() => setCurrentPage(startPage - 1)}>
                ◀
                </button>
            )}

            {Array.from(
                { length: endPage - startPage + 1 },
                (_, i) => startPage + i
            ).map(page => (
                <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                    color : page === currentPage ? "red" : "black",
                    fontWeight: page === currentPage ? "bold" : "normal"
                }}
                >
                {page}
                </button>
            ))}

            {endPage < totalPages && (
                <button onClick={() => setCurrentPage(endPage + 1)}>
                ▶
                </button>
            )}
        </div>
    </>
  );
}

export default Home;