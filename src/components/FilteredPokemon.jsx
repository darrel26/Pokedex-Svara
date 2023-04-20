import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokedexRegionData, getPokemonTypesData } from "../utils/queries";
import { PokemonContext } from "../context/pokemonContext";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";

export default function FilteredPokemon() {
  const { searchKeyword } = useContext(PokemonContext);
  const location = useLocation();
  const filterType = location.pathname.split("/").splice(1, 2);

  const filterRequest = useQuery({
    queryKey: ["pokemon-filter", filterType[1]],
    queryFn:
      filterType[0] === "pokedex" ? getPokedexRegionData : getPokemonTypesData,
  });

  if (filterRequest.isLoading) {
    return (
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  const pokemonList =
    filterType[0] === "pokedex"
      ? filterRequest.data.pokemon_entries
      : filterRequest.data.pokemon;

  return (
    <>
      <div className="nav-bar">
        <Link to={"/"} style={{ textDecoration: "none", color: "#fff" }}>
          <h1>Pokédex</h1>
        </Link>
      </div>
      <SearchBar />
      <div className="list-container">
        {pokemonList
          .filter((pokemon) =>
            filterType[0] === "pokedex"
              ? pokemon.pokemon_species.name.includes(searchKeyword)
              : pokemon.pokemon.name.includes(searchKeyword)
          )
          .map((pokemon, index) => (
            <PokemonCard
              key={index + 1}
              pokemonName={
                filterType[0] === "pokedex"
                  ? pokemon.pokemon_species.name
                  : pokemon.pokemon.name
              }
              pokemonUrl={
                filterType[0] === "pokedex"
                  ? pokemon.pokemon_species.url
                  : pokemon.pokemon.url
              }
            />
          ))}
      </div>
    </>
  );
}
