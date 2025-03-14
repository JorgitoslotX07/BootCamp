let peticionApiPag = 0;
let peticionApiPoke =
  "https://pokeapi.co/api/v2/pokemon?offset=" + peticionApiPag + "&limit=20";
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

const actualizarPeticion = () => {
  peticionApiPag += 20;
  peticionApiPoke =
    "https://pokeapi.co/api/v2/pokemon?offset=" + peticionApiPag + "&limit=20";
};

document.addEventListener("DOMContentLoaded", () => {
  peticioPoke();
  creacionTipoPoke();

  let busc = btnBusc();
  busc.addEventListener("click", () => {
    filtroSearch(true);
  });

  let input = inputBusc();
  input.addEventListener("input", () => {
    filtroSearch(false);
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
          console.log(e.name);
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

document.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
    peticioPoke();
  }
});

async function peticioPoke() {
  let date;
  try {
    let response = await fetch(peticionApiPoke);
    let data = await response.json();
    date = data.results;

    añadirPokeGen(date);

    DATA = DATA.concat(date);
    console.log(DATA);

    actualizarPeticion();
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

function primeraLetra(texto) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
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

    veriFiltroTipoUni(e);
    poked.appendChild(añadirPoke(e));
  }
  actualizarPokedex();
}

function añadirPoke(po) {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
        <img src="${po.img}" alt="${primeraLetra(po.name)}">
        <h2>${primeraLetra(po.name)}</h2>
        <span>#${po.id}</span>
    `;
  return card;
}

async function fotoPoke(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return { img: data.sprites.front_default, tipo: data.types };
  } catch (error) {
    console.error("Error en la petición de la Foto:", error);
    return "error.jpg";
  }
}

function creacionTipoPoke() {
  let box = document.getElementById("filtros");

  tipoPoke.forEach((po, index) => {
    let fil = document.createElement("div");
    fil.className = "type " + po;
    console.log(fil.classList);
    fil.innerHTML = primeraLetra(po);

    fil.addEventListener("click", () => {
      let clases = fil.className.split(" ");
      if (clases.includes("fixed")) {
        clases = clases.filter((c) => c !== "fixed");
        fil.className = clases.join(" ");
        tipoPokeActivo = tipoPokeActivo.filter((c) => c !== tipoPokeIng[index]);
      } else {
        fil.className += " fixed";
        tipoPokeActivo.push(tipoPokeIng[index]);
      }
      console.log(tipoPokeActivo);
      filtroTipo();
    });

    box.appendChild(fil);
  });
}

function filtroTipo() {
  if (tipoPokeActivo.length != 0) {
    DATA.forEach((e) => {
      veriFiltroTipo(e);
    });
  } else {
    DATA.forEach((obj) => (obj.visibilidad = true));
  }
  actualizarPokedex();
}
function veriFiltroTipo(e) {
  if (!e.tipo.some((t) => tipoPokeActivo.includes(t.type.name))) {
    e.visibilidad = false;
  } else {
    e.visibilidad = true;
  }
}

function veriFiltroTipoUni(e) {
  if (tipoPokeActivo.length != 0) {
    veriFiltroTipo(e);
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
}
