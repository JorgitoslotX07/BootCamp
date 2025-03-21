import { PokemonClass } from "../pokemonClass";
import { peticioPoke } from "./fetch";
import { generarPokesComun } from "../main";

export function guardarLocalStorage(pokemons: Array<PokemonClass>) {
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
}

export function borarLocalStorage() {
  localStorage.removeItem("pokemons");
}

export function subirNuevoLocalStorage(pokemons: Array<PokemonClass>) {
  borarLocalStorage();
  guardarLocalStorage(pokemons);
}

export async function pedirLocalStorage(): Promise<Array<PokemonClass>> {
  let pokemonsStorage: string | null = localStorage.getItem("pokemons");
  if (pokemonsStorage) {
    return JSON.parse(pokemonsStorage);
  } else {
    await peticioPoke();
    return pedirLocalStorage();
  }
}

export async function peticionLocalPoke() {
  let pokemons: Array<PokemonClass> = await pedirLocalStorage();
  await generarPokesComun(pokemons);
}
