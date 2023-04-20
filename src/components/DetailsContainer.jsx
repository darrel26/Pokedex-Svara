import React from "react";
import { useContext } from "react";
import { PokemonContext } from "../main";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

export default function DetailsContainer() {
  const { pokemonDetails, setSavedPokemon } = useContext(PokemonContext);

  return (
    <>
      <img
        src={pokemonDetails.sprites.other["official-artwork"].front_default}
        alt={pokemonDetails.name}
      />
      <h1>{pokemonDetails.name}</h1>
      <div className="pokemon-types">
        {pokemonDetails.types.map((type) => (
          <p id={type.type.name}>{type.type.name}</p>
        ))}
      </div>
      <h2>Abilities</h2>
      <div className="pokemon-abilities">
        {pokemonDetails.abilities.map((ability) => (
          <p>
            {ability.ability.name}
            {ability.is_hidden ? (
              ""
            ) : (
              <span className="icon-eye_slash">
                <FontAwesomeIcon icon={faEyeSlash} size="lg" />
              </span>
            )}
          </p>
        ))}
      </div>
      <div className="pokemon-size">
        <div className="size-card">
          <h3>Weight</h3>
          <p>{pokemonDetails.weight}lbs</p>
        </div>
        <div className="size-card">
          <h3>Height</h3>
          <p>{pokemonDetails.height}m</p>
        </div>
      </div>
      <button
        onClick={() => {
          Swal.fire({
            width: "400px",
            icon: "question",
            title: "Do you want to save the changes?",
            input: "text",
            inputLabel: "Add Pokemon Alias",
            inputValidator: (value) => {
              if (!value) {
                return "You need to write something!";
              }
            },
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
          }).then((result) => {
            if (result.isConfirmed) {
              setSavedPokemon((current) => [
                ...current,
                {
                  ...pokemonDetails,
                  alias: `${result.value} #${
                    Math.round(Math.random() * 10000) + 1
                  }`,
                },
              ]);
              Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        }}
        className="btn-save-pokemon"
      >
        Save Pokemon
      </button>
    </>
  );
}
