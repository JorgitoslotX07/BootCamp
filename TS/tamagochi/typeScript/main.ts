import { Pokemon } from "./pokemon";

let peticionApiPoke: string =
  "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302";
let DATA: Array<Pokemon> = [];

var currentPage: number = 1;
let itemsPerPage: number = 20;
let totalItems: number;
const resetearPage = () => {
  currentPage = 1;
  itemsPerPage = 20;
  actualizarPokedex();
};

const tipoPok: Array<string> = [
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
  DATA.forEach((obj: Pokemon) => (obj.visibilidad = true));

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

  DATA.forEach((e) => {
    var palabrasEnFiltro = filter.split(" ");
    var hallado = 0;
    for (var filtro of palabrasEnFiltro) {
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
  let option = document.createElement("option");
  option.value = name;
  ayu.appendChild(option);
}

async function peticioPoke() {
  try {
    let response = await fetch(peticionApiPoke);
    let data = await response.json();
    await generarPokes(data.results);

    // await anadirPokeGen(data.results);
    DATA = DATA.concat(data.results);
    actualizarPokedex();
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

async function generarPokes(obj: Array<any>) {
  let id = 0;
  for (let e of obj) {
    let newPoke: Pokemon;
    newPoke.id = id;
    id++;

    let info = await fotoPoke(e.url);
    e.img = info.img;
    e.tipo = info.tipo;

    await veriFiltroTipoUni(e);
    // poked.appendChild(anadirPoke(e));
  }

  let load = loader();
  load.classList.add("noMostrar");
  load.classList.remove("loader");
}

/*

async function anadirPokeGen(obj) {
  let poked = pokedex() as HTMLDivElement;
  let id = 0;
  for (let e of obj) {
    id++;
    e.id = id;

    let info = await fotoPoke(e.url);
    e.img = info.img;
    e.tipo = info.tipo;

    await veriFiltroTipoUni(e);
    poked.appendChild(anadirPoke(e));
  }

  let load = loader();
  load.classList.add("noMostrar");
  load.classList.remove("loader");
}
*/
function primeraLetra(texto: String) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
