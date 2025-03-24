import { PokemonClass } from "./pokemonClass";
import {
  limpiar,
  btnBusc,
  inputBusc,
  nextPage,
  prevPage,
  loader,
  pokedex,
  filtrosFixed,
  ayudaPoke,
  reiniciar,
  anadirGuardarPoke,
  btnAnadirPoke,
  actuPage,
  cerrarAnadirPoke,
  pokeRandom,
} from "./TS/util";
import {
  creacionTipoPoke,
  reiniciarTipoPokeActivo,
  todoVisible,
  mostrarPoke,
  reiniciarTipoPoke,
  enviarPokeDetalle,
} from "./TS/generacionesFRONT";

import { borarLocalStorage, peticionLocalPoke } from "./TS/localStorage";
import {
  actualizarTotal,
  cambiarPagina,
  currentPage,
  itemsPerPage,
  resetearPage,
  paginasDisponibles,
  cambiarPaginaAbosuluto,
  setCurrentPage,
  actualizarPaginacion,
} from "./TS/paginacion";
import { filtroSearch, mostarXInput, filtroTipo } from "./TS/filtros";
import { visibilidadPopUpAnadir, botonesPopUpAnadir } from "./TS/modifPoke";

let DATA: Array<PokemonClass>;
const params: URLSearchParams = new URLSearchParams(window.location.search);
const page: number | null = Number(params.get("page"));

document.addEventListener("DOMContentLoaded", async () => {
  await crearPag();

  let busc = btnBusc() as HTMLButtonElement;
  busc.addEventListener("click", () => filtroSearch(true, DATA));

  let input = inputBusc() as HTMLInputElement;
  input.addEventListener("input", () => {
    filtroSearch(false, DATA);
    mostarXInput();
    resetearPage();
  });

  let limp = limpiar() as HTMLButtonElement;
  limp.addEventListener("click", () => {
    limpiarTodo();
    resetearPage();
  });

  let next = nextPage() as HTMLButtonElement;
  next.addEventListener("click", () => cambiarPagina(true));

  let prev = prevPage() as HTMLButtonElement;
  prev.addEventListener("click", () => cambiarPagina(false));

  let reiniciarLocal: HTMLElement | null = reiniciar();
  reiniciarLocal?.addEventListener("click", () => {
    borarLocalStorage();

    let load = loader();
    load?.classList.add("loader");
    load?.classList.remove("noMostrar");

    reiniciarPag();
    // actualizarPokedex();
  });

  let popAnadir: HTMLElement | null = btnAnadirPoke();
  popAnadir?.addEventListener("click", () => {
    visibilidadPopUpAnadir();

    let guardarNewPoke: HTMLElement | null = anadirGuardarPoke();
    guardarNewPoke?.addEventListener("click", () => botonesPopUpAnadir(DATA));
  });

  let popCerrarAnadir: HTMLElement | null = cerrarAnadirPoke();
  popCerrarAnadir?.addEventListener("click", () => {
    visibilidadPopUpAnadir();
  });

  let actualPage = actuPage() as HTMLSelectElement;
  actualPage?.addEventListener("change", () => {
    cambiarPaginaAbosuluto(Number(actualPage.value), DATA);
  });

  let pokeR: HTMLElement | null = pokeRandom();
  pokeR?.addEventListener("click", () => {
    let po: PokemonClass = DATA[Math.floor(Math.random() * DATA.length)];
    enviarPokeDetalle(po);
  });
});

export function generarPokesComun(pokemons: Array<PokemonClass>) {
  DATA = [];
  DATA.push(...pokemons);
  // console.log(pokemons);

  actualizarTotal(DATA);
  actualizarPokedex();

  let load = loader();
  load?.classList.add("noMostrar");
  load?.classList.remove("loader");
}

export async function actualizarPokedex() {
  let poked = pokedex() as HTMLDivElement;
  poked.innerHTML = "";

  let mostrar = 0;
  let iteraconActual = 0;
  let veriMostrar = 0;
  let yaMostrado = (currentPage - 1) * itemsPerPage;
  while (iteraconActual != DATA.length) {
    //  && mostrar != yaMostrad
    let date = DATA[iteraconActual];
    if (
      date.visibilidad &&
      veriMostrar == yaMostrado &&
      mostrar < itemsPerPage
    ) {
      mostrarPoke(date, DATA);
      mostrar++;
    }

    if (veriMostrar != yaMostrado && date.visibilidad) {
      veriMostrar++;
    }
    iteraconActual++;
  }
  paginasDisponibles(DATA);
}

function limpiarTodo() {
  let btnLim = limpiar() as HTMLButtonElement;

  let input = inputBusc() as HTMLInputElement;
  let ayu = ayudaPoke() as HTMLDataListElement;
  let filt: HTMLCollectionOf<Element> | null = filtrosFixed();

  reiniciarTipoPokeActivo();
  input.value = "";
  ayu.innerHTML = "";

  let veces: number = filt.length;
  for (let i: number = 0; i < veces; i++) {
    filt[0].classList.remove("fixed");
  }
  todoVisible(DATA);

  actualizarPokedex();
  btnLim.classList.add("noMostrar");
}

async function crearPag() {
  await peticionLocalPoke();

  await creacionTipoPoke(DATA);
  await filtroTipo(DATA);
  if (page != null) {
    setCurrentPage(page, DATA);
  }
  actualizarPaginacion(DATA);
}

async function reiniciarPag() {
  limpiarTodo();
  await peticionLocalPoke();
  await reiniciarTipoPoke(DATA);
  resetearPage();
}
