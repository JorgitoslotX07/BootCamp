import { primeraLetra } from "./utils.js";

let peticionApiPag = 0;
let peticionApiPoke =
  "https://pokeapi.co/api/v2/pokemon?offset=" + peticionApiPag + "&limit=1250";
let DATA = [];
const tipoPoke = [
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

const tipoPokeIng = [
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

let tipoPokeActivo = [];

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

// const actualizarPeticion = () => {
//   peticionApiPag += 20;
//   peticionApiPoke =
//     "https://pokeapi.co/api/v2/pokemon?offset=" + peticionApiPag + "&limit=20";
// };

const todoVisible = () => DATA.forEach((obj) => (obj.visibilidad = true));

let currentPage = 1;
let itemsPerPage = 20;
let totalItems;

document.addEventListener("DOMContentLoaded", async () => {
  await creacionTipoPoke();

  await peticioPoke();

  let busc = btnBusc();
  busc.addEventListener("click", () => {
    filtroSearch(true);
  });

  let input = inputBusc();
  input.addEventListener("input", () => {
    filtroSearch(false);
    mostarXInput();
  });

  let limp = limpiar();
  limp.addEventListener("click", () => {
    limpiarTodo();
  });

  let next = nextPage();
  next.addEventListener("click", () => {
    cambiarPagina("next");
  });

  let prev = nextPage();
  prev.addEventListener("click", () => {
    cambiarPagina("prev");
  });
});

function filtroSearch(param) {
  let input = inputBusc();
  let filter = input.value.toLowerCase();

  let ayu = ayudaPoke();
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
          // console.log(e.name);
        }
      }
    }
  });
  actualizarPokedex();
}

function buscarFiltroSearch(name) {
  let ayu = ayudaPoke();
  let option = document.createElement("option");
  option.value = name;
  ayu.appendChild(option);
}

// document.addEventListener("scroll", () => {
//   if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
//     peticioPoke();
//   }
// });

async function peticioPoke() {
  let date;
  try {
    let response = await fetch(peticionApiPoke);
    let data = await response.json();
    date = data.results;

    await añadirPokeGen(date);

    DATA = DATA.concat(date);
    // console.log(DATA);

    // actualizarPeticion();
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

async function añadirPokeGen(obj) {
  let poked = pokedex();
  let id = peticionApiPag;
  for (let e of obj) {
    id++;
    e.id = id;

    let info = await fotoPoke(e.url);
    e.img = info.img;
    e.tipo = info.tipo;

    await veriFiltroTipoUni(e);
    poked.appendChild(añadirPoke(e));
  }
  actualizarPokedex();

  let load = loader();
  load.classList.add("noMostrar");
  load.classList.remove("loader");
}

function añadirPoke(po) {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <img src="${po.img}" alt="${primeraLetra(po.name)}">
        <h2>${primeraLetra(po.name)}</h2>
        <span>#${po.id}</span>
    `;

  card.addEventListener("click", () => {
    let paramUrl = po.url;
    if (paramUrl) {
      let url =
        "http://localhost:5500/JS/RetoPoke/poke.html?url=" +
        encodeURIComponent(paramUrl);
      window.open(url, "_blank");
    } else {
      console.error("URL del Pokémon no disponible");
    }
    // window.location.href = url;
  });
  return card;
}

async function fotoPoke(url) {
  if (!url) {
    console.error("URL de Pokémon no disponible");
    return { img: "error.jpg", tipo: [] };
  }
  try {
    let response = await fetch(url);
    let data = await response.json();
    return { img: data.sprites.front_default, tipo: data.types };
  } catch (error) {
    console.error("Error en la petición de la Foto:", error);
    return "error.jpg";
  }
}

async function creacionTipoPoke() {
  let box = filtros();

  // tipoPoke.forEach((po, index) => {
  for (let i = 0; i < tipoPoke.length; i++) {
    const po = tipoPoke[i];

    let fil = document.createElement("div");
    fil.className = "type " + po;
    // console.log(fil.classList);
    fil.innerHTML = primeraLetra(po);

    fil.addEventListener("click", async () => {
      if (fil.classList.contains("fixed")) {
        fil.classList.remove("fixed");
        let index = tipoPokeActivo.indexOf(tipoPokeIng[i]); // Buscar la posición

        if (index !== -1) {
          tipoPokeActivo.splice(index, 1); // Eliminar el elemento en esa posición
        }
        // tipoPokeActivo = tipoPokeActivo.filter((c) => c !== tipoPokeIng[i]);
      } else {
        fil.classList.add("fixed");
        tipoPokeActivo.push(tipoPokeIng[i]);
      }
      await filtroTipo();
      mostarXFiltros();
    });

    box.appendChild(fil);
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
async function veriFiltroTipo(e) {
  if (!e || !Array.isArray(e.tipo)) {
    console.error("Error: e.tipo es undefined o no es un array", e);
    // return;
    // e.visibilidad = false;
  }

  if (tipoPokeActivo.length > 1) {
    if (
      !e.tipo.every(
        (t) =>
          tipoPokeActivo.includes(t.type.name) &&
          e.tipo.length == tipoPokeActivo.length
      )
    ) {
      e.visibilidad = false;
    } else {
      e.visibilidad = true;
    }
  } else {
    if (!e.tipo.some((t) => tipoPokeActivo.includes(t.type.name))) {
      e.visibilidad = false;
    } else {
      e.visibilidad = true;
    }
  }
}

async function veriFiltroTipoUni(e) {
  if (tipoPokeActivo.length != 0) {
    await veriFiltroTipo(e);
  } else {
    e.visibilidad = true;
  }
}

function actualizarPokedex() {
  let poked = pokedex();
  let cards = poked.querySelectorAll(".card");

  DATA.forEach((e, index) => {
    if (e.visibilidad) {
      cards[index].classList.remove("noMostrar");
    } else {
      cards[index].classList.add("noMostrar");
    }
  });
  // console.log("Listo🦆");
  totalItems = totalVisibles();
}

function mostarXInput() {
  let btnBusc = inputBusc();
  let btnLim = limpiar();

  if (btnBusc.value != "") {
    btnLim.classList.remove("noMostrar");
  } else {
    btnLim.classList.add("noMostrar");
  }
}

function mostarXFiltros() {
  let filt = filtrosFixed();
  let btnLim = limpiar();
  if (filt.length > 0) {
    btnLim.classList.remove("noMostrar");
  } else {
    btnLim.classList.add("noMostrar");
  }
}

function limpiarTodo() {
  let btnLim = limpiar();

  let input = inputBusc();
  let ayu = ayudaPoke();
  let filt = filtrosFixed();

  tipoPokeActivo = [];
  input.value = "";
  ayu.innerHTML = "";

  let veces = filt.length;
  for (let i = 0; i < veces; i++) {
    filt[0].classList.remove("fixed");
  }
  todoVisible();

  actualizarPokedex();
  btnLim.classList.add("noMostrar");
}

// ? Botones de mierda :c

function actualizarPaginacion() {
  let totalPages = Math.ceil(totalItems / itemsPerPage);

  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

function cambiarPagina(direccion) {
  let totalPages = Math.ceil(totalItems / itemsPerPage);

  if (direccion === "prev" && currentPage > 1) {
    currentPage--;
  } else if (direccion === "next" && currentPage < totalPages) {
    currentPage++;
  }

  actualizarPaginacion();
}

function totalVisibles() {
  let i = 0;
  for (const e of DATA) {
    if (DATA.visibilidad) {
      i++;
    }
  }
}
