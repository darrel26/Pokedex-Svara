import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { PokemonContext } from "../main";
import { getPokemonDetails } from "../utils/queries";
import Swal from "sweetalert2";

export default function PokemonCard({ pokemonName, pokemonUrl }) {
  const { setSavedPokemon, setPokemonDetails, setShowModal } =
    useContext(PokemonContext);
  const location = useLocation().pathname;

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
        src={
          location === "/Pokedex-Svara/profile"
            ? pokemonUrl
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemonUrl.split("/")[6]
              }.png`
        }
        alt={pokemonName}
      />
      <h3 id={pokemonName}>{pokemonName}</h3>
      {location === "/profile" ? (
        <div
          className="cover-card"
          onClick={(e) =>
            Swal.fire({
              title: "Are you sure you want to remove this pokemon?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                setSavedPokemon((current) =>
                  current.filter(
                    (pokemon) =>
                      pokemon.alias !==
                      e.target.parentNode.querySelector("h3").innerText
                  )
                );
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              }
            })
          }
        >
          <FontAwesomeIcon
            icon={faTrash}
            size="4x"
            color="#fff"
          ></FontAwesomeIcon>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
