import { PokemonClass } from "../pokemonClass";
import { peticioPoke } from "./fetch";
import { actualizarPokedex, generarPokesComun } from "../main";
import { actualizarPaginacion } from "./paginacion";

export function guardarLocalStorage(pokemons: Array<PokemonClass>) {
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
}

export function borarLocalStorage() {
  localStorage.removeItem("pokemons");
}

export function subirNuevoLocalStorage(pokemons: Array<PokemonClass>) {
  borarLocalStorage();
  guardarLocalStorage(pokemons);
  actualizarPaginacion(pokemons);
  actualizarPokedex();
}

export async function pedirLocalStorage(): Promise<Array<PokemonClass>> {
  let pokemonsStorage: string | null = localStorage.getItem("pokemons");

  if (pokemonsStorage) {
    return JSON.parse(pokemonsStorage);
  } else {
    await peticioPoke();

    pokemonsStorage = localStorage.getItem("pokemons");
    return pokemonsStorage ? JSON.parse(pokemonsStorage) : [];
  }
}

export async function peticionLocalPoke() {
  let pokemons: Array<PokemonClass> = await pedirLocalStorage();
  generarPokesComun(pokemons);
}

export function guardarLocalStorageFiltroTipo(tipoActivo: Array<string>) {
  localStorage.setItem("tipoPokeActivo", JSON.stringify(tipoActivo));
}

export function borarLocalStorageFiltroTipo() {
  localStorage.removeItem("tipoPokeActivo");
}

export function subirNuevoLocalStorageFiltroTipo(
  tipoActivo: Array<string>,
  DATA: Array<PokemonClass>
) {
  borarLocalStorageFiltroTipo();
  guardarLocalStorageFiltroTipo(tipoActivo);
  actualizarPaginacion(DATA);
  actualizarPokedex();
}

export function pedirLocalStorageFiltroTipo(): Array<string> {
  let tipoPokeStorage: string | null = localStorage.getItem("tipoPokeActivo");
  return tipoPokeStorage ? JSON.parse(tipoPokeStorage) : [];
}
