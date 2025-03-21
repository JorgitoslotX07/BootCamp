import { actualizarPokedex } from "../main";
import { PokemonClass } from "../pokemonClass";
import { nextPage, prevPage } from "./util";

export const totalPages = () => Math.ceil(totalItems / itemsPerPage);

export var currentPage: number = 1;
export let itemsPerPage: number = 20;
export let totalItems: number;
export const resetearPage = () => {
  currentPage = 1;
  itemsPerPage = 20;
  actualizarPokedex();
};

export function actualizarPaginacion() {
  let tp: number = totalPages();
  let next = nextPage() as HTMLButtonElement;
  if (currentPage == 1) next.disabled;

  let prev = prevPage() as HTMLButtonElement;
  if (currentPage == tp) prev.disabled;
}

export function cambiarPagina(direccion: Boolean) {
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

export function actualizarTotal(DATA: Array<PokemonClass>) {
  totalItems = DATA.length;
  totalPages();
}
