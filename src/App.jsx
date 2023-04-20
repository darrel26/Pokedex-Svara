import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import FilteredPokemon from "./components/FilteredPokemon";
import { PokemonContext } from "./main";
import SavedPokemon from "./components/SavedPokemon";

export default function App() {
  const [savedPokemon, setSavedPokemon] = useState([]);

  const [pokemonData, setPokemonData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/Pokedex-Svara/",
      element: <Home />,
    },
    {
      path: "/Pokedex-Svara/:based/:filter",
      element: <FilteredPokemon />,
    },
    {
      path: "/Pokedex-Svara/profile",
      element: <SavedPokemon />,
    },
  ]);
  return (
    <PokemonContext.Provider
      value={{
        savedPokemon,
        setSavedPokemon,
        pokemonData,
        setPokemonData,
        searchKeyword,
        setSearchKeyword,
        pokemonDetails,
        setPokemonDetails,
        showModal,
        setShowModal,
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </PokemonContext.Provider>
  );
}
