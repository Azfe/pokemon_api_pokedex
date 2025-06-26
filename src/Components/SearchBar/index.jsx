import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Buscar por nombre o ID"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="bg-primary text-white p-2 rounded">
        Buscar
      </button>
    </form>
  );
}