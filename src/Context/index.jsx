import { createContext, useState, useEffect } from "react";

// Creación del contexto
export const PokedexContext = createContext();

// Proveedor del contexto
export const PokedexProvider = ({ children }) => {
  // Pokemon data state
  const [pokemon, setPokemon] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/"
        );        

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }

        const jsonData = await response.json();
        setPokemon(jsonData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching pokemon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // El array vacío significa que se ejecuta solo al montar el componente

  return (
    <PokedexContext.Provider
      value={{
        pokemon,
        setPokemon
      }}
    >
      {children}
    </PokedexContext.Provider>
  );
};