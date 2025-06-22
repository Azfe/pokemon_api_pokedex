import { useState } from "react";
import SearchBar from "../../Components/SearchBar";
import PokemonCard from "../../Components/PokemonCard";
import { fetchPokemonByNameOrId } from "../../services/API/pokemonApi";

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    try {
      const data = await fetchPokemonByNameOrId(query);
      setPokemon(data);
      setError("");
    } catch (e) {
      setError("Pokémon no encontrado");
      setPokemon(null);
    }
  };

  return (        
    <div className="p-4">
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <h1 className='font-medium text-xl'>
          Pokedex
        </h1>
      </div>
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500">{error}</p>}
      {pokemon && <PokemonCard data={pokemon} />}
    </div>
  );
}