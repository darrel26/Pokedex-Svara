import React, { useContext } from "react";
import { PokemonContext } from "../main";

export default function SearchBar() {
  const { setSearchKeyword } = useContext(PokemonContext);
  return (
    <div className="search-bar home">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
    </div>
  );
}
