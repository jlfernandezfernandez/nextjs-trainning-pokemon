import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { SimplePokemon, PokemonsResponse, PokemonGrid } from "../../../pokemons";

const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
    const data: PokemonsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        .then(res => res.json());
    const pokemons = data.results.map(pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name
    }));

    // throw new Error('Error que no debería suceder')
    // throw notFound();

    return pokemons;
}


export default async function PokemonsPage() {
    const pokemons = await getPokemons(151);
    return (
        <div className="flex flex-col">
            <span className="text-5xl my-3">Listado de pokemos</span>
            <PokemonGrid pokemons={pokemons} />
        </div>
    );
}