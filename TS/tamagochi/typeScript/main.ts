import { PokemonClass } from "./pokemonClass";
import { PokemonData } from "./pokemon";
import { primeraLetra } from "./util";

let peticionApiPoke: string =
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302";
let DATA: Array<PokemonClass> = [];

var currentPage: number = 1;
let itemsPerPage: number = 20;
let totalItems: number;
const totalPages = () => Math.ceil(totalItems / itemsPerPage);
const resetearPage = () => {
  currentPage = 1;
  itemsPerPage = 20;
  actualizarPokedex();
};

const tipoPoke: Array<string> = [
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
const tipoPokeIng: Array<string> = [
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
let tipoPokeActivo: Array<string> = [];

const pokedex = () => document.getElementById("grid-container");
const btnBusc = () => document.getElementById("btnBuscar");
const ayudaPoke = () => document.getElementById("ayudaPoke");
const inputBusc = () => document.getElementById("buscar");
const limpiar = () => document.getElementById("btnLimpiar");
const filtros = () => document.getElementById("filtros");
const filtrosFixed = () => document.getElementsByClassName("fixed");
const loader = () => document.getElementById("loader");

const prevPage = () => document.getElementById("prevPage");
const nextPage = () => document.getElementById("nextPage");

const todoVisible = () =>
  DATA.forEach((obj: PokemonClass) => (obj.visibilidad = true));

document.addEventListener("DOMContentLoaded", async () => {
  await creacionTipoPoke();
  await peticioPoke();

  let busc = btnBusc() as HTMLButtonElement;
  busc.addEventListener("click", () => filtroSearch(true));

  let input = inputBusc() as HTMLInputElement;
  input.addEventListener("input", () => {
    filtroSearch(false);
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
});

function filtroSearch(param: boolean) {
  let input = document.getElementById("miInput") as HTMLInputElement;
  let filter: string = input.value.toLowerCase();

  let ayu = ayudaPoke() as HTMLDataListElement;
  ayu.innerHTML = "";

  DATA.forEach((e: PokemonClass) => {
    let palabrasEnFiltro: Array<string> = filter.split(" ");
    let hallado: number = 0;
    for (let filtro of palabrasEnFiltro) {
      if (e.name.indexOf(filtro) > -1) {
        hallado++;
      }
      if (param) {
        if (hallado === palabrasEnFiltro.length) {
          e.visibilidad = true;
        } else {
          e.visibilidad = false;
        }
      } else {
        if (hallado === palabrasEnFiltro.length) {
          buscarFiltroSearch(e.name);
        }
      }
    }
  });
  actualizarPokedex();
}
function buscarFiltroSearch(name: string) {
  let ayu = ayudaPoke() as HTMLDataListElement;
  let option: HTMLOptionElement = document.createElement("option");
  option.value = name;
  ayu.appendChild(option);
}

async function peticioPoke() {
  try {
    let response: Response = await fetch(peticionApiPoke);
    let data: any = await response.json();
    await generarPokes(data.results);
    actualizarPokedex();
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

async function generarPokes(obj: Array<any>) {
  let id = 0;
  for (let e of obj) {
    let info: PokemonData = await fotoPoke(e.url);
    let newPoke = new PokemonClass(
      id,
      e.name,
      info.img,
      info.tipo,
      e.url,
      true
    );
    DATA.push(newPoke);
    id++;
  }
  totalItems = DATA.length;
  actualizarPokedex();
  let load: HTMLElement | null = loader();
  load?.classList.add("noMostrar");
  load?.classList.remove("loader");
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
      img: data.sprites.front_default,
      tipo: data.types.map((t: { type: { name: string } }) => t.type.name),
    };
  } catch (error) {
    console.error("Error en la petición de la Foto:", error);
    return { img: "error.jpg", tipo: [] };
  }
}
function mostrarPoke(po: PokemonClass) {
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
      let url: string =
        "http://localhost:5500/JS/RetoPoke/poke.html?url=" +
        encodeURIComponent(paramUrl);
      window.open(url, "_blank");
    } else {
      console.error("URL del Pokémon no disponible");
    }
    // window.location.href = url;
  });

  let poked = pokedex() as HTMLDivElement;
  poked.appendChild(card);
}

async function creacionTipoPoke() {
  let box: HTMLElement | null = filtros();

  // tipoPoke.forEach((po, index) => {
  for (let i: number = 0; i < tipoPoke.length; i++) {
    const po: string = tipoPoke[i];

    let fil: HTMLDivElement = document.createElement("div");
    fil.className = "type " + po;
    // console.log(fil.classList);
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
      await filtroTipo();
      mostarXFiltros();
      resetearPage();
    });

    box?.appendChild(fil);
  }
}

async function filtroTipo() {
  if (tipoPokeActivo.length != 0) {
    for (const e of DATA) {
      await veriFiltroTipo(e);
    }
  } else {
    todoVisible();
  }
  actualizarPokedex();
}
async function veriFiltroTipo(e: PokemonClass) {
  if (!e || !Array.isArray(e.tipo)) {
    console.error("Error: e.tipo es undefined o no es un array", e);
  }

  if (tipoPokeActivo.length > 1) {
    if (
      !e.tipo.every(
        (t) =>
          tipoPokeActivo.includes(t) && e.tipo.length == tipoPokeActivo.length
      )
    ) {
      e.visibilidad = false;
    } else {
      e.visibilidad = true;
    }
  } else {
    if (!e.tipo.some((t) => tipoPokeActivo.includes(t))) {
      e.visibilidad = false;
    } else {
      e.visibilidad = true;
    }
  }
}

async function veriFiltroTipoUni(e: PokemonClass) {
  if (tipoPokeActivo.length != 0) {
    await veriFiltroTipo(e);
  } else {
    e.visibilidad = true;
  }
}

async function actualizarPokedex() {
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
      mostrarPoke(date);
      mostrar++;
    }

    if (veriMostrar != yaMostrado && date.visibilidad) {
      veriMostrar++;
    }
    iteraconActual++;
  }
}

function mostarXInput() {
  let btnBusc = inputBusc() as HTMLInputElement;
  let btnLim = limpiar() as HTMLButtonElement;

  if (btnBusc?.value != "") {
    btnLim.classList.remove("noMostrar");
  } else {
    btnLim.classList.add("noMostrar");
  }
}

function mostarXFiltros() {
  let filt = filtrosFixed();
  let btnLim = limpiar() as HTMLButtonElement;

  if (filt.length > 0) {
    btnLim.classList.remove("noMostrar");
  } else {
    btnLim.classList.add("noMostrar");
  }
}

function limpiarTodo() {
  let btnLim = limpiar() as HTMLButtonElement;

  let input = inputBusc() as HTMLInputElement;
  let ayu = ayudaPoke() as HTMLDataListElement;
  let filt: HTMLCollectionOf<Element> | null = filtrosFixed();

  tipoPokeActivo = [];
  input.value = "";
  ayu.innerHTML = "";

  let veces: number = filt.length;
  for (let i: number = 0; i < veces; i++) {
    filt[0].classList.remove("fixed");
  }
  todoVisible();

  actualizarPokedex();
  btnLim.classList.add("noMostrar");
}

// ? Botones de mierda :c

function actualizarPaginacion() {
  let tp: number = totalPages();
  let next = nextPage() as HTMLButtonElement;
  if (currentPage == 1) next.disabled;

  let prev = prevPage() as HTMLButtonElement;
  if (currentPage == tp) next.disabled;
}

function cambiarPagina(direccion: Boolean) {
  let tp: number = totalPages();

  if (!direccion && currentPage > 1) {
    currentPage--;
  } else if (direccion && currentPage < tp) {
    //&& currentPage < tp
    currentPage++;
  }

  actualizarPokedex();
  document.documentElement.scrollTop = 0;

  actualizarPaginacion();
}
