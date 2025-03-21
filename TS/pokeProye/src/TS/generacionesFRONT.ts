import { PokemonClass } from "../pokemonClass";
import { primeraLetra, filtros, pokedex } from "./util";
import { resetearPage } from "./paginacion";
import { crearBox } from "./modifPoke";
import { filtroTipo, mostarXFiltros } from "./filtros";

export const tipoPoke: Array<string> = [
  "acero",
  "agua",
  "bicho",
  "dragón",
  "eléctrico",
  "fantasma",
  "fuego",
  "hada",
  "hielo",
  "lucha",
  "normal",
  "planta",
  "psíquico",
  "roca",
  "siniestro",
  "tierra",
  "veneno",
  "volador",
];
export const tipoPokeIng: Array<string> = [
  "steel",
  "water",
  "bug",
  "dragon",
  "electric",
  "ghost",
  "fire",
  "fairy",
  "ice",
  "fighting",
  "normal",
  "grass",
  "psychic",
  "rock",
  "dark",
  "ground",
  "poison",
  "flying",
];
export let tipoPokeActivo: Array<string> = [];
export function reiniciarTipoPokeActivo() {
  tipoPokeActivo = [];
}

export const todoVisible = (DATA: Array<PokemonClass>) =>
  DATA.forEach((obj: PokemonClass) => (obj.visibilidad = true));

export async function creacionTipoPoke(DATA: Array<PokemonClass>) {
  let box: HTMLElement | null = filtros();

  for (let i: number = 0; i < tipoPoke.length; i++) {
    const po: string = tipoPoke[i];

    let fil: HTMLDivElement = document.createElement("div");
    fil.className = "type " + po;
    fil.innerHTML = primeraLetra(po);

    fil.addEventListener("click", async () => {
      if (fil.classList.contains("fixed")) {
        fil.classList.remove("fixed");
        let index: number = tipoPokeActivo.indexOf(tipoPokeIng[i]);

        if (index !== -1) {
          tipoPokeActivo.splice(index, 1);
        }
        // tipoPokeActivo = tipoPokeActivo.filter((c) => c !== tipoPokeIng[i]);
      } else {
        fil.classList.add("fixed");
        tipoPokeActivo.push(tipoPokeIng[i]);
      }
      await filtroTipo(DATA);
      mostarXFiltros();
      resetearPage();
    });

    box?.appendChild(fil);
  }
}

export function mostrarPoke(po: PokemonClass, DATA: Array<PokemonClass>) {
  let card: HTMLDivElement = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <img src="${po.img}" alt="${primeraLetra(po.name)}">
        <h2>${primeraLetra(po.name)}</h2>
        <span>#${po.id}</span>
    `;

  card.addEventListener("click", () => {
    let paramUrl: string = po.url;
    if (paramUrl) {
      let url: string = `/src/html/poke.html?url=${encodeURIComponent(
        paramUrl
      )}`;
      window.open(url, "_blank");
    } else {
      console.error("URL del Pokémon no disponible");
    }
  });

  card.appendChild(crearBox("🗑", "basura", po, DATA));
  card.appendChild(crearBox("🦆", "modif", po, DATA));

  let poked = pokedex() as HTMLDivElement;
  poked.appendChild(card);
}
