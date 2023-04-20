import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPokedexRegionData, getPokemonTypesData } from "../utils/queries";
import { PokemonContext } from "../main";
import SearchBar from "./SearchBar";
import PokemonCard from "./PokemonCard";
import LoadingAnimation from "./LoadingAnimation";
import DetailsModal from "./DetailsModal";
import DetailsContainer from "./DetailsContainer";

export default function FilteredPokemon() {
  const { pokemonDetails, setSearchKeyword, searchKeyword, showModal } =
    useContext(PokemonContext);
  const location = useLocation();
  const filterType = location.pathname.split("/").splice(1, 2);

  const filterRequest = useQuery({
    queryKey: ["pokemon-filter", filterType[1]],
    queryFn:
      filterType[0] === "pokedex" ? getPokedexRegionData : getPokemonTypesData,
  });

  if (filterRequest.isLoading) {
    return <LoadingAnimation />;
  }

  const pokemonList =
    filterType[0] === "pokedex"
      ? filterRequest.data.pokemon_entries
      : filterRequest.data.pokemon;

  return (
    <>
      {showModal === true ? <DetailsModal /> : ""}
      <div className="home-container mw-1024">
        <div className="left-container mw-1024">
          <div className="nav-bar">
            <Link
              to={"/"}
              style={{ textDecoration: "none", color: "#fff" }}
              onClick={() => setSearchKeyword("")}
            >
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
        </div>
        <div className="right-container mw-1024">
          {pokemonDetails !== null ? <DetailsContainer /> : ""}
        </div>
      </div>
    </>
  );
}
