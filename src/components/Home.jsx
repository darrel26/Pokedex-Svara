import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { getPokemonDetails, getPokemonList } from "../utils/queries";

export default function Home() {
  const pokemonRequests = useQueries({
    queries: [
      {
        queryKey: ["pokemon-list", 300],
        queryFn: getPokemonList,
      },
      {
        queryKey: ["pokemon-details", 1],
        queryFn: getPokemonDetails,
      },
    ],
  });

  if (pokemonRequests.some((response) => response.isLoading)) {
    return <div className="home-spinner">Loading...</div>;
  }

  const pokemon = pokemonRequests[0].data.results;

  console.log(pokemon);
  return <div>Home</div>;
}
