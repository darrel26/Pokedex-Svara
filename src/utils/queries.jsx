export const getPokemonList = async ({ queryKey }) => {
  const number = queryKey[1];
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${number}`);
  if (!res.ok) {
    throw new Error("failed to fetch data!");
  }

  return res.json();
};

export const getPokemonDetails = async ({ queryKey }) => {
  const pokemonId = queryKey[1];
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
  if (!res.ok) {
    throw new Error("failed to fetch data!");
  }

  return res.json();
};
