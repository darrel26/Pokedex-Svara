import React from "react";

export default function PokemonCard({ pokemonName, pokemonUrl }) {
  return (
    <div className="pokemon-card">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemonUrl.split("/")[6]
        }.png`}
        alt={pokemonUrl.split("/")[6]}
      />
      <h3>{pokemonName}</h3>
    </div>
  );
}
