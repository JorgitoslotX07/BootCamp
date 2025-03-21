import { primeraLetra } from "./util";
import { PokemonDetalleClass } from "../pokemonClass";

const params: URLSearchParams = new URLSearchParams(window.location.search);
const _URL: string | null = params.get("url");

async function infoPoke() {
  try {
    if (_URL) {
      let response: Response = await fetch(_URL);
      let data: any = await response.json();
      return data;
    } else {
      console.error("Error en la peticion de Poke:");
      return "error";
    }
  } catch (error) {
    console.error("Error en la petición del Pokemon:", error);
    return "error";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  let date: any = await infoPoke();

  let data: PokemonDetalleClass = new PokemonDetalleClass(
    date.id,
    date.name,
    date.abilities,
    date.height,
    date.base_experience,
    date.types,
    date.sprites
  );
  console.log(data);

  let pokeName: HTMLElement | null = document.getElementById("pokemon-name");
  if (pokeName != null) pokeName.textContent = primeraLetra(data.name);

  let pokeId: HTMLElement | null = document.getElementById("pokemon-id");
  if (pokeId != null) pokeId.textContent = String(data.id).padStart(3, "0");

  let i: number = 1;
  let div: HTMLElement | null = document.getElementById("ability-box");
  for (const e of data.abilities) {
    let pElement = document.createElement("p");

    pElement.id = "ability-" + i;
    pElement.classList.add("ability");

    pElement.textContent = `Habilidad ${i}: ${primeraLetra(e.ability.name)}`;

    div?.appendChild(pElement);

    i++;

    if (i == 4) break;
  }

  let pokeHeight: HTMLElement | null = document.getElementById("height");
  if (pokeHeight) pokeHeight.textContent = String(data.height * 0.1);

  let pokeEXP: HTMLElement | null = document.getElementById("base-exp");
  if (pokeEXP) pokeEXP.textContent = String(data.base_experience);

  let div2: HTMLElement | null = document.getElementById("type-box");

  for (const e of data.types) {
    let pElement: HTMLParagraphElement = document.createElement("p");

    pElement.id = "type-" + i;
    pElement.classList.add("type");
    pElement.classList.add(e.type.name);

    pElement.textContent = `${primeraLetra(e.type.name)}`;

    div2?.appendChild(pElement);

    i++;
  }

  let pokeFoto = document.getElementById("pokemon-image") as HTMLImageElement;
  pokeFoto.src = data.sprites.front_default;

  let pokeFotoShiny = document.getElementById(
    "pokemon-image-shi"
  ) as HTMLImageElement;
  pokeFotoShiny.src = data.sprites.front_shiny;
});
