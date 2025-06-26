import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchFilters = ({ filters, onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const pokemonTypes = [
        'normal', 'fire', 'water', 'electric', 'grass', 'ice',
        'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
        'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];

    const generations = [
        { value: '1', label: 'Gen I (Kanto)' },
        { value: '2', label: 'Gen II (Johto)' },
        { value: '3', label: 'Gen III (Hoenn)' },
        { value: '4', label: 'Gen IV (Sinnoh)' },
        { value: '5', label: 'Gen V (Unova)' },
        { value: '6', label: 'Gen VI (Kalos)' },
        { value: '7', label: 'Gen VII (Alola)' },
        { value: '8', label: 'Gen VIII (Galar)' }
    ];

    const handleTypeChange = (type) => {
        const newTypes = filters.types.includes(type)
            ? filters.types.filter(t => t !== type)
            : [...filters.types, type];
        onFilterChange({ ...filters, types: newTypes });
    };

    const clearAllFilters = () => {
        onFilterChange({
            types: [],
            generation: '',
            minStats: '',
            maxStats: ''
        });
    };

    const hasActiveFilters = filters.types.length > 0 || filters.generation || filters.minStats || filters.maxStats;

    return (
        <div className="mt-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 mx-auto px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
                <Filter className="h-4 w-4" />
                Filtros Avanzados
                {hasActiveFilters && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {filters.types.length + (filters.generation ? 1 : 0) + (filters.minStats ? 1 : 0) + (filters.maxStats ? 1 : 0)}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="mt-4 p-6 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Filtros de Búsqueda</h3>
                        {hasActiveFilters && (
                            <button
                                onClick={clearAllFilters}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Filtro por Tipo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo de Pokémon
                            </label>
                            <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                                {pokemonTypes.map(type => (
                                    <label key={type} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={filters.types.includes(type)}
                                            onChange={() => handleTypeChange(type)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm capitalize">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Filtro por Generación */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Generación
                            </label>
                            <select
                                value={filters.generation}
                                onChange={(e) => onFilterChange({ ...filters, generation: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todas las generaciones</option>
                                {generations.map(gen => (
                                    <option key={gen.value} value={gen.value}>
                                        {gen.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filtros por Estadísticas */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estadísticas Base Mínimas
                            </label>
                            <input
                                type="number"
                                value={filters.minStats}
                                onChange={(e) => onFilterChange({ ...filters, minStats: e.target.value })}
                                placeholder="Ej: 500"
                                min="0"
                                max="800"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estadísticas Base Máximas
                            </label>
                            <input
                                type="number"
                                value={filters.maxStats}
                                onChange={(e) => onFilterChange({ ...filters, maxStats: e.target.value })}
                                placeholder="Ej: 600"
                                min="0"
                                max="800"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchFilters;