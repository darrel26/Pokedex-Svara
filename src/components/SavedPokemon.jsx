import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { PokemonContext } from "../main";
import PokemonCard from "./PokemonCard";

export default function SavedPokemon() {
  const { savedPokemon } = useContext(PokemonContext);

  if (savedPokemon.length === 0) {
    return (
      <div className="empty-data">
        <Link
          to={"/Pokedex-Svara"}
          style={{ textDecoration: "none", fontSize: "48px", color: "#fff" }}
        >
          No Data
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="nav-bar">
        <h1>
          <span>
            <Link
              to={"/Pokedex-Svara"}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <FontAwesomeIcon icon={faBackward} className="icon-back" />
            </Link>
          </span>
          Colléction
        </h1>
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
