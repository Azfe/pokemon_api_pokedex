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
    <div className='flex items-center justify-center relative bg-gray-dark w-full mb-6 py-8 gap-x-40'>
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Nombre o número de Pokémon</h2>
        <SearchBar onSearch={handleSearch} />
        {error && <p className="text-red-500">{error}</p>}
        {pokemon && <PokemonCard data={pokemon} />}
      </div>
      <div className="bg-secondary rounded-lg p-4 shadow-lg w-full max-w-md">
        <p>Busca un Pokémon por su nombre o usando su número de la Pokédex Nacional.</p>
      </div>
    </div>
  );
}