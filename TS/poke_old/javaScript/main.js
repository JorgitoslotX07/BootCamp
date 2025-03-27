"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pokemonClass_1 = require("./pokemonClass");
const util_1 = require("./util");
let peticionApiPoke = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302";
let DATA = [];
var currentPage = 1;
let itemsPerPage = 20;
let totalItems;
const totalPages = () => Math.ceil(totalItems / itemsPerPage);
const resetearPage = () => {
    currentPage = 1;
    itemsPerPage = 20;
    actualizarPokedex();
};
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
const todoVisible = () => DATA.forEach((obj) => (obj.visibilidad = true));
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    yield creacionTipoPoke();
    yield peticioPoke();
    let busc = btnBusc();
    busc.addEventListener("click", () => filtroSearch(true));
    let input = inputBusc();
    input.addEventListener("input", () => {
        filtroSearch(false);
        mostarXInput();
        resetearPage();
    });
    let limp = limpiar();
    limp.addEventListener("click", () => {
        limpiarTodo();
        resetearPage();
    });
    let next = nextPage();
    next.addEventListener("click", () => cambiarPagina(true));
    let prev = prevPage();
    prev.addEventListener("click", () => cambiarPagina(false));
}));
function filtroSearch(param) {
    let input = document.getElementById("miInput");
    let filter = input.value.toLowerCase();
    let ayu = ayudaPoke();
    ayu.innerHTML = "";
    DATA.forEach((e) => {
        let palabrasEnFiltro = filter.split(" ");
        let hallado = 0;
        for (let filtro of palabrasEnFiltro) {
            if (e.name.indexOf(filtro) > -1) {
                hallado++;
            }
            if (param) {
                if (hallado === palabrasEnFiltro.length) {
                    e.visibilidad = true;
                }
                else {
                    e.visibilidad = false;
                }
            }
            else {
                if (hallado === palabrasEnFiltro.length) {
                    buscarFiltroSearch(e.name);
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
function peticioPoke() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield fetch(peticionApiPoke);
            let data = yield response.json();
            yield generarPokes(data.results);
            actualizarPokedex();
        }
        catch (error) {
            console.error("Error en la petición:", error);
        }
    });
}
function generarPokes(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 0;
        for (let e of obj) {
            let info = yield fotoPoke(e.url);
            let newPoke = new pokemonClass_1.PokemonClass(id, e.name, info.img, info.tipo, e.url, true);
            DATA.push(newPoke);
            id++;
        }
        totalItems = DATA.length;
        actualizarPokedex();
        let load = loader();
        load === null || load === void 0 ? void 0 : load.classList.add("noMostrar");
        load === null || load === void 0 ? void 0 : load.classList.remove("loader");
    });
}
function fotoPoke(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            console.error("URL de Pokémon no disponible");
            return { img: "error.jpg", tipo: [] };
        }
        try {
            let response = yield fetch(url);
            let data = yield response.json();
            return {
                img: data.sprites.front_default,
                tipo: data.types.map((t) => t.type.name),
            };
        }
        catch (error) {
            console.error("Error en la petición de la Foto:", error);
            return { img: "error.jpg", tipo: [] };
        }
    });
}
function mostrarPoke(po) {
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${po.img}" alt="${(0, util_1.primeraLetra)(po.name)}">
        <h2>${(0, util_1.primeraLetra)(po.name)}</h2>
        <span>#${po.id}</span>
    `;
    card.addEventListener("click", () => {
        let paramUrl = po.url;
        if (paramUrl) {
            let url = "http://localhost:5500/JS/RetoPoke/poke.html?url=" +
                encodeURIComponent(paramUrl);
            window.open(url, "_blank");
        }
        else {
            console.error("URL del Pokémon no disponible");
        }
        // window.location.href = url;
    });
    let poked = pokedex();
    poked.appendChild(card);
}
function creacionTipoPoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let box = filtros();
        // tipoPoke.forEach((po, index) => {
        for (let i = 0; i < tipoPoke.length; i++) {
            const po = tipoPoke[i];
            let fil = document.createElement("div");
            fil.className = "type " + po;
            // console.log(fil.classList);
            fil.innerHTML = (0, util_1.primeraLetra)(po);
            fil.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                if (fil.classList.contains("fixed")) {
                    fil.classList.remove("fixed");
                    let index = tipoPokeActivo.indexOf(tipoPokeIng[i]);
                    if (index !== -1) {
                        tipoPokeActivo.splice(index, 1);
                    }
                    // tipoPokeActivo = tipoPokeActivo.filter((c) => c !== tipoPokeIng[i]);
                }
                else {
                    fil.classList.add("fixed");
                    tipoPokeActivo.push(tipoPokeIng[i]);
                }
                yield filtroTipo();
                mostarXFiltros();
                resetearPage();
            }));
            box === null || box === void 0 ? void 0 : box.appendChild(fil);
        }
    });
}
function filtroTipo() {
    return __awaiter(this, void 0, void 0, function* () {
        if (tipoPokeActivo.length != 0) {
            for (const e of DATA) {
                yield veriFiltroTipo(e);
            }
        }
        else {
            todoVisible();
        }
        actualizarPokedex();
    });
}
function veriFiltroTipo(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!e || !Array.isArray(e.tipo)) {
            console.error("Error: e.tipo es undefined o no es un array", e);
        }
        if (tipoPokeActivo.length > 1) {
            if (!e.tipo.every((t) => tipoPokeActivo.includes(t) && e.tipo.length == tipoPokeActivo.length)) {
                e.visibilidad = false;
            }
            else {
                e.visibilidad = true;
            }
        }
        else {
            if (!e.tipo.some((t) => tipoPokeActivo.includes(t))) {
                e.visibilidad = false;
            }
            else {
                e.visibilidad = true;
            }
        }
    });
}
function veriFiltroTipoUni(e) {
    return __awaiter(this, void 0, void 0, function* () {
        if (tipoPokeActivo.length != 0) {
            yield veriFiltroTipo(e);
        }
        else {
            e.visibilidad = true;
        }
    });
}
function actualizarPokedex() {
    return __awaiter(this, void 0, void 0, function* () {
        let poked = pokedex();
        poked.innerHTML = "";
        let mostrar = 0;
        let iteraconActual = 0;
        let veriMostrar = 0;
        let yaMostrado = (currentPage - 1) * itemsPerPage;
        while (iteraconActual != DATA.length) {
            //  && mostrar != yaMostrad
            let date = DATA[iteraconActual];
            if (date.visibilidad &&
                veriMostrar == yaMostrado &&
                mostrar < itemsPerPage) {
                mostrarPoke(date);
                mostrar++;
            }
            if (veriMostrar != yaMostrado && date.visibilidad) {
                veriMostrar++;
            }
            iteraconActual++;
        }
    });
}
function mostarXInput() {
    let btnBusc = inputBusc();
    let btnLim = limpiar();
    if ((btnBusc === null || btnBusc === void 0 ? void 0 : btnBusc.value) != "") {
        btnLim.classList.remove("noMostrar");
    }
    else {
        btnLim.classList.add("noMostrar");
    }
}
function mostarXFiltros() {
    let filt = filtrosFixed();
    let btnLim = limpiar();
    if (filt.length > 0) {
        btnLim.classList.remove("noMostrar");
    }
    else {
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
    let tp = totalPages();
    let next = nextPage();
    if (currentPage == 1)
        next.disabled;
    let prev = prevPage();
    if (currentPage == tp)
        next.disabled;
}
function cambiarPagina(direccion) {
    let tp = totalPages();
    if (!direccion && currentPage > 1) {
        currentPage--;
    }
    else if (direccion && currentPage < tp) {
        //&& currentPage < tp
        currentPage++;
    }
    actualizarPokedex();
    document.documentElement.scrollTop = 0;
    actualizarPaginacion();
}
