import React, { useState } from 'react';
import SearchBar from '../../SearchBar';
import SearchFilters from '../../searchComponents/SearchFilters';

const SearchSection = ({ onSearch, onFilterChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    types: [],
    generation: '',
    minStats: '',
    maxStats: ''
  });

  const handleSearchChange = (value) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Busca tu Pokémon
          </h2>
          <p className="text-gray-600">
            Encuentra información detallada sobre cualquier Pokémon
          </p>
        </div>

        <SearchBar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          placeholder="Introduce el nombre del Pokémon..."
        />

        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
    </section>
  );
};

export default SearchSection;