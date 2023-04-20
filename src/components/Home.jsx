import React, { useContext, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import {
  getPokemonDetails,
  getPokemonList,
  getPokedexRegion,
  getPokemonTypes,
} from "../utils/queries";
import { useNavigate } from "react-router-dom";
import { PokemonContext } from "../context/pokemonContext";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";

export default function Home() {
  const navigate = useNavigate();
  const { pokemonData, setPokemonData, searchKeyword } =
    useContext(PokemonContext);

  const pokemonRequests = useQueries({
    queries: [
      {
        queryKey: ["pokemon-list", 300],
        queryFn: getPokemonList,
        onSuccess: (pokemon) => {
          setPokemonData(pokemon.results);
        },
      },
      {
        queryKey: ["pokemon-details", 1],
        queryFn: getPokemonDetails,
      },
      {
        queryKey: ["pokemon-region"],
        queryFn: getPokedexRegion,
      },
      {
        queryKey: ["pokemon-types"],
        queryFn: getPokemonTypes,
      },
    ],
  });

  if (pokemonRequests.some((response) => response.isLoading)) {
    return <div className="home-spinner">Loading...</div>;
  }

  const pokemonRegion = pokemonRequests[2].data.results;
  const pokemonTypes = pokemonRequests[3].data.results;

  return (
    <>
      <div className="nav-bar">
        <h1>Pokédex</h1>
      </div>
      <SearchBar />
      <ul className="filter-container">
        <li>
          <select
            id="region"
            name="Region"
            className="dropdown region-dropdown"
            onChange={(e) => navigate(`/pokedex/${e.target.value}`)}
          >
            {pokemonRegion.map((region) => (
              <option value={region.name} key={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </li>
        <li>
          <select
            id="type"
            name="Types"
            className="dropdown types-dropdown"
            onChange={(e) => navigate(`/type/${e.target.value}`)}
          >
            {pokemonTypes.map((type) => (
              <option value={type.name} key={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <div className="list-container">
        {pokemonData
          .filter((pokemon) =>
            pokemon.name.includes(searchKeyword.toLowerCase())
          )
          .map((pokemon, index) => (
            <PokemonCard
              key={index + 1}
              pokemonName={pokemon.name}
              pokemonUrl={pokemon.url}
            />
          ))}
      </div>
    </>
  );
}
