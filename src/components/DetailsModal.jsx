import React, { useContext } from "react";
import { PokemonContext } from "../context/pokemonContext";
import LoadingAnimation from "./LoadingAnimation";

export default function DetailsModal() {
  const { pokemonDetails, showModal, setShowModal } =
    useContext(PokemonContext);
  if (!showModal) {
    return <LoadingAnimation />;
  }
  return (
    <div
      className="modal-container"
      onClick={() => setShowModal(false)}
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-body">
        <img
          src={pokemonDetails.sprites.other["official-artwork"].front_default}
          className="details pokemon-image"
          alt={pokemonDetails.name}
        ></img>
        <h1>{pokemonDetails.name}</h1>
        <ul className="details pokemon-type">
          {pokemonDetails.types.map((type, index) => (
            <li key={`type ${index + 1}`} id={type.type.name}>
              {type.type.name}
            </li>
          ))}
        </ul>
        <table>
          <tbody>
            <tr>
              <th>Weight</th>
              <td>{pokemonDetails.weight}lbs</td>
            </tr>
            <tr>
              <th>Height</th>
              <td>{pokemonDetails.height}m</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
