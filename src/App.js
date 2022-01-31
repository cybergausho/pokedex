import { useEffect, useState } from "react";
import PokemonThumbnails from "./components/pokemonThumbnails";

function App() {
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
  

  const getAllPokemon = async ()=> {
    const res = await fetch(loadMore)
    const data = await res.json()

    setLoadMore(data.next)
    
    function createPokemonObject (result) {
      result.forEach( async pokemon => {
        const res= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data])

        })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }


  useEffect(() => {
      getAllPokemon()
  }, [])


  return (
    <div className="app-container">
      <h1>REA<s>CT</s>L POKEDEX</h1>
      <div className="pokemon-container">
            <div className="all-container">
              {allPokemons.map((pokemon, index) => 
              <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              img={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              key={index}
              />
              )}
            </div>
            <button className="load-more" onClick={() => getAllPokemon()}>Ver más</button>

      </div>
    </div>
  );
}

export default App;
