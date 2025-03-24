import { actualizarPokedex } from "../main";
import { PokemonClass } from "../pokemonClass";
import { nextPage, prevPage, actuPage } from "./util";

export const totalPages = () => Math.ceil(totalItems / itemsPerPage);

export var currentPage: number = 1;
export let itemsPerPage: number = 20;
export let totalItems: number;

export const resetearPage = () => {
  currentPage = 1;
  itemsPerPage = 20;
  actualizarPokedex();
};
export function setCurrentPage(params: number, DATA: Array<PokemonClass>) {
  let dispo = calcularPaginasDisponibles(DATA);
  params > dispo
    ? actualizarCurrentPage(dispo)
    : params > 0 && actualizarCurrentPage(params);
  actualizarPokedex();
  actualizarPaginacion(DATA);
}

export function actualizarPaginacion(DATA: Array<PokemonClass>) {
  let tp: number = calcularPaginasDisponibles(DATA);
  let next = nextPage() as HTMLButtonElement;
  next.disabled = currentPage == tp;

  let prev = prevPage() as HTMLButtonElement;
  prev.disabled = currentPage <= 1;
}

export function cambiarPagina(direccion: Boolean) {
  let tp: number = totalPages();

  if (!direccion && currentPage > 1) {
    actualizarCurrentPage(currentPage - 1);
  } else if (direccion && currentPage < tp) {
    actualizarCurrentPage(currentPage + 1);
  }

  actualizarScroll();
}

function actualizarScroll() {
  let actualPage = actuPage() as HTMLSelectElement;
  actualPage.value = String(currentPage);

  let url: string = `../../index.html?page=${encodeURIComponent(currentPage)}`;
  window.location.href = url;
}

export function actualizarTotal(DATA: Array<PokemonClass>) {
  totalItems = DATA.length;
  totalPages();
}

export function paginasDisponibles(DATA: Array<PokemonClass>) {
  let actualPage = actuPage() as HTMLSelectElement;
  actualPage.innerHTML = "";
  let pageDispo: number = calcularPaginasDisponibles(DATA);
  for (let i = 1; i <= pageDispo; i++) {
    let sel: HTMLOptionElement = document.createElement("option");
    sel.value, (sel.textContent = String(i));
    i == currentPage && (sel.selected = true);

    actualPage.appendChild(sel);
  }
}

export function cambiarPaginaAbosuluto(pag: number, DATA: Array<PokemonClass>) {
  pag > 0 && pag <= calcularPaginasDisponibles(DATA)
    ? actualizarCurrentPage(pag)
    : console.log("Sos puto", pag);
  actualizarScroll();
}

function actualizarCurrentPage(pag: number) {
  let actualPage = actuPage() as HTMLSelectElement;
  actualPage.value = String(pag);
  currentPage = pag;
}

function calcularPaginasDisponibles(DATA: Array<PokemonClass>): number {
  if (!Array.isArray(DATA)) {
    console.error("El parámetro DATA no es un array válido.");
    return 0;
  }

  let i: number = 1;
  let x: number = 0;
  DATA.forEach((e) => {
    e.visibilidad && x++;

    if (x == itemsPerPage) {
      i++;
      x = 0;
    }
  });

  return i;
}
