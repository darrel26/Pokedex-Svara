import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import { getPokemonDetails } from "../utils/queries";
import LoadingAnimation from "./LoadingAnimation";

export default function PokemonCard({ pokemonName, pokemonUrl }) {
  const { setPokemonDetails, setShowModal } = useContext(PokemonContext);

  const detailsRequest = useQuery({
    queryKey: ["pokemon-details", pokemonName],
    queryFn: getPokemonDetails,
    enabled: false,
    onSuccess: (pokemon) => {
      setPokemonDetails(pokemon);
      setShowModal(true);
    },
  });

  return (
    <div
      className="pokemon-card"
      onClick={() => {
        detailsRequest.refetch();
      }}
    >
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
