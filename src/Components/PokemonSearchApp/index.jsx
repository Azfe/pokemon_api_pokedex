import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronDown, Loader2 } from 'lucide-react';

const PokemonSearchApp = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('number-asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    weakness: '',
    ability: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    generation: ''
  });

  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);

  // Función para obtener datos de la API
  const fetchPokemonData = async () => {
    try {
      setLoading(true);
      
      // Obtener lista inicial de Pokémon (primeros 151 para mejor rendimiento)
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await response.json();
      
      // Obtener detalles de cada Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon, index) => {
          const detailResponse = await fetch(pokemon.url);
          const details = await detailResponse.json();
          
          // Obtener información de especies para debilidades
          const speciesResponse = await fetch(details.species.url);
          const speciesData = await speciesResponse.json();
          
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other['official-artwork'].front_default || details.sprites.front_default,
            types: details.types.map(type => type.type.name),
            abilities: details.abilities.map(ability => ability.ability.name),
            height: details.height / 10, // Convertir a metros
            weight: details.weight / 10, // Convertir a kg
            generation: speciesData.generation.name,
            stats: details.stats
          };
        })
      );
      
      setPokemon(pokemonDetails);
      
      // Extraer tipos únicos para filtros
      const allTypes = [...new Set(pokemonDetails.flatMap(p => p.types))];
      setPokemonTypes(allTypes);
      
      // Extraer habilidades únicas para filtros
      const allAbilities = [...new Set(pokemonDetails.flatMap(p => p.abilities))];
      setPokemonAbilities(allAbilities.slice(0, 50)); // Limitar para mejor rendimiento
      
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  // Función para obtener debilidades de un tipo
  const getTypeWeaknesses = (types) => {
    const typeWeaknesses = {
      normal: ['fighting'],
      fire: ['water', 'ground', 'rock'],
      water: ['electric', 'grass'],
      electric: ['ground'],
      grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
      ice: ['fire', 'fighting', 'rock', 'steel'],
      fighting: ['flying', 'psychic', 'fairy'],
      poison: ['ground', 'psychic'],
      ground: ['water', 'grass', 'ice'],
      flying: ['electric', 'ice', 'rock'],
      psychic: ['bug', 'ghost', 'dark'],
      bug: ['fire', 'flying', 'rock'],
      rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
      ghost: ['ghost', 'dark'],
      dragon: ['ice', 'dragon', 'fairy'],
      dark: ['fighting', 'bug', 'fairy'],
      steel: ['fire', 'fighting', 'ground'],
      fairy: ['poison', 'steel']
    };
    
    return [...new Set(types.flatMap(type => typeWeaknesses[type] || []))];
  };

  // Filtrar y ordenar Pokémon
  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = pokemon.filter(p => {
      // Búsqueda por nombre o ID
      const matchesSearch = searchTerm === '' || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toString().includes(searchTerm);
      
      // Filtros avanzados
      const matchesType = !filters.type || p.types.includes(filters.type);
      const matchesAbility = !filters.ability || p.abilities.includes(filters.ability);
      const matchesHeight = (!filters.minHeight || p.height >= parseFloat(filters.minHeight)) &&
                           (!filters.maxHeight || p.height <= parseFloat(filters.maxHeight));
      const matchesWeight = (!filters.minWeight || p.weight >= parseFloat(filters.minWeight)) &&
                           (!filters.maxWeight || p.weight <= parseFloat(filters.maxWeight));
      const matchesGeneration = !filters.generation || p.generation === filters.generation;
      
      // Filtro por debilidad
      const matchesWeakness = !filters.weakness || 
        getTypeWeaknesses(p.types).includes(filters.weakness);
      
      return matchesSearch && matchesType && matchesAbility && matchesHeight && 
             matchesWeight && matchesGeneration && matchesWeakness;
    });

    // Ordenar resultados
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'number-asc':
          return a.id - b.id;
        case 'number-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return a.id - b.id;
      }
    });

    return filtered;
  }, [pokemon, searchTerm, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      weakness: '',
      ability: '',
      minHeight: '',
      maxHeight: '',
      minWeight: '',
      maxWeight: '',
      generation: ''
    });
    setSearchTerm('');
  };

  const getTypeColor = (type) => {
    const colors = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-700',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };
    return colors[type] || 'bg-gray-400';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-semibold text-gray-700">Cargando Pokémon...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔍 Buscador de Pokémon
          </h1>
          <p className="text-gray-600">Encuentra tu Pokémon favorito</p>
        </div>

        {/* Búsqueda y controles */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {/* Barra de búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o número..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Controles de ordenamiento y filtros */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="number-asc">Número ↑</option>
                <option value="number-desc">Número ↓</option>
                <option value="name-asc">A → Z</option>
                <option value="name-desc">Z → A</option>
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtros
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className="text-sm text-gray-600">
              {filteredAndSortedPokemon.length} Pokémon encontrados
            </div>
          </div>

          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                  >
                    <option value="">Todos los tipos</option>
                    {pokemonTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Debilidad</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.weakness}
                    onChange={(e) => handleFilterChange('weakness', e.target.value)}
                  >
                    <option value="">Todas las debilidades</option>
                    {pokemonTypes.map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Habilidad</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.ability}
                    onChange={(e) => handleFilterChange('ability', e.target.value)}
                  >
                    <option value="">Todas las habilidades</option>
                    {pokemonAbilities.map(ability => (
                      <option key={ability} value={ability}>
                        {ability.charAt(0).toUpperCase() + ability.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Generación</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.generation}
                    onChange={(e) => handleFilterChange('generation', e.target.value)}
                  >
                    <option value="">Todas las generaciones</option>
                    <option value="generation-i">Generación I</option>
                    <option value="generation-ii">Generación II</option>
                    <option value="generation-iii">Generación III</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={filters.minHeight}
                      onChange={(e) => handleFilterChange('minHeight', e.target.value)}
                      step="0.1"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={filters.maxHeight}
                      onChange={(e) => handleFilterChange('maxHeight', e.target.value)}
                      step="0.1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={filters.minWeight}
                      onChange={(e) => handleFilterChange('minWeight', e.target.value)}
                      step="0.1"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      value={filters.maxWeight}
                      onChange={(e) => handleFilterChange('maxWeight', e.target.value)}
                      step="0.1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Grid de resultados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredAndSortedPokemon.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform"
            >
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-32 object-contain"
                  loading="lazy"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg capitalize text-gray-800">
                    {p.name}
                  </h3>
                  <span className="text-sm font-semibold text-gray-500">
                    #{p.id.toString().padStart(3, '0')}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.types.map((type) => (
                    <span
                      key={type}
                      className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getTypeColor(type)}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                
                <div className="text-xs text-gray-600 space-y-1">
                  <div>Altura: {p.height}m</div>
                  <div>Peso: {p.weight}kg</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {filteredAndSortedPokemon.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No se encontraron Pokémon
            </h3>
            <p className="text-gray-500">
              Intenta ajustar tus filtros de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonSearchApp;