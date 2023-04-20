import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import FilteredPokemon from "./components/FilteredPokemon";
import { PokemonContext } from "./context/pokemonContext";

export default function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:based/:filter",
      element: <FilteredPokemon />,
    },
  ]);
  return (
    <PokemonContext.Provider
      value={{ pokemonData, setPokemonData, searchKeyword, setSearchKeyword }}
    >
      <RouterProvider router={router}></RouterProvider>
    </PokemonContext.Provider>
  );
}
