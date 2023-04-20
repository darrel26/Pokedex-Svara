import React, { useContext } from "react";
import { PokemonContext } from "../main";
import PokemonCard from "./PokemonCard";

export default function SavedPokemon() {
  const { savedPokemon, setSavedPokemon } = useContext(PokemonContext);

  if (savedPokemon.length === 0) {
    return <div className="empty-data">No Data</div>;
  }

  return (
    <>
      <div className="nav-bar">
        <h1>Colléction</h1>
      </div>
      <div className="list-container">
        {savedPokemon.map((pokemon, index) => (
          <PokemonCard
            key={index + 1}
            pokemonName={pokemon.alias}
            pokemonUrl={pokemon.sprites.front_default}
          />
        ))}
      </div>
    </>
  );
}
