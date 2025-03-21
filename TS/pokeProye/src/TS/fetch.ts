import { PokemonClass } from "../pokemonClass";
import { guardarLocalStorage } from "./localStorage";
import { PokemonData } from "../pokemon";

let peticionApiPoke: string =
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302";

export async function peticioPoke() {
  try {
    let response: Response = await fetch(peticionApiPoke);
    let data: any = await response.json();
    await generarPokes(data.results);
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

async function generarPokes(obj: Array<{ name: string; url: string }>) {
  try {
    let promesas = obj.map(async (e, id) => {
      let info = await fotoPoke(e.url);
      return new PokemonClass(id + 1, info.img, e.name, info.tipo, e.url, true);
    });

    let pokemons = await Promise.all(promesas);
    guardarLocalStorage(pokemons);
  } catch (error) {
    console.error("Error generando Pokémon:", error);
  }
}

async function fotoPoke(url: string): Promise<PokemonData> {
  if (!url) {
    console.error("URL de Pokémon no disponible");
    return { img: "error.jpg", tipo: [] };
  }

  try {
    let response = await fetch(url);
    let data = await response.json();
    return {
      img: data.sprites.front_default ?? "default.jpg",
      tipo:
        data.types?.map((t: { type: { name: string } }) => t.type.name) || [],
    };
  } catch (error) {
    console.error("Error en la petición de la Foto:", error);
    return { img: "error.jpg", tipo: [] };
  }
}
