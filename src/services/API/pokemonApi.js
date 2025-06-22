export const fetchPokemonByNameOrId = async (query) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
  // Verificar si la respuesta es exitosa
  if (!response.ok) {
    throw new Error("Pokémon no encontrado");
  }

  return response.json();
};

/*
const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=20';

export const fetchPokemons = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  const details = await Promise.all(
    data.results.map(async (p) => {
      const res = await fetch(p.url);
      return res.json();
    })
  );
  return details;
};
*/