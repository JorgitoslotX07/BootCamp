export function primeraLetra(texto: String) {
  if (!texto) return "";
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export const pokedex = () => document.getElementById("grid-container");
export const btnBusc = () => document.getElementById("btnBuscar");
export const ayudaPoke = () => document.getElementById("ayudaPoke");
export const inputBusc = () => document.getElementById("buscar");
export const limpiar = () => document.getElementById("btnLimpiar");
export const filtros = () => document.getElementById("filtros");
export const filtrosFixed = () => document.getElementsByClassName("fixed");
export const loader = () => document.getElementById("loader");
export const reiniciar = () => document.getElementById("reiniciarLocal");

export const prevPage = () => document.getElementById("prevPage");
export const nextPage = () => document.getElementById("nextPage");

export const popUp = () => document.getElementById("popup");
export const idPoke = () => document.getElementById("idPoke");
export const namePoke = () => document.getElementById("pokemon-name");
export const imgPoke = () => document.getElementById("pokemon-image");
export const tipPoke = () => document.getElementById("pokemon-types");
export const guardarPoke = () => document.getElementById("save-btn");
export const cerrarPoke = () => document.getElementById("close-btn");

export const anadirPokePopUp = () => document.getElementById("popupAnadirPoke");
export const anadirNombrePoke = () => document.getElementById("pokeNombre");
export const anadirImgPoke = () => document.getElementById("pokeImagen");
export const anadirTipoPoke = () => document.getElementById("pokeTipo");
export const anadirGuardarPoke = () =>
  document.getElementById("btnGuardarPoke");
export const btnAnadirPoke = () => document.getElementById("btnAnadirPoke");
