import { actualizarPokedex } from "../main";
import { PokemonClass } from "../pokemonClass";
import { inputBusc, limpiar, filtrosFixed, ayudaPoke } from "./util";
import { tipoPokeActivo, todoVisible } from "./generacionesFRONT";

export async function filtroTipo(DATA: Array<PokemonClass>) {
  if (tipoPokeActivo.length != 0) {
    for (const e of DATA) {
      await veriFiltroTipo(e);
    }
  } else {
    todoVisible(DATA);
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

// export async function veriFiltroTipoUni(e: PokemonClass) {
//   if (tipoPokeActivo.length != 0) {
//     await veriFiltroTipo(e);
//   } else {
//     e.visibilidad = true;
//   }
// }

export function mostarXInput() {
  let btnBusc = inputBusc() as HTMLInputElement;
  let btnLim = limpiar() as HTMLButtonElement;

  if (btnBusc?.value != "") {
    btnLim.classList.remove("noMostrar");
  } else {
    btnLim.classList.add("noMostrar");
  }
}

export function mostarXFiltros() {
  let filt = filtrosFixed();
  let btnLim = limpiar() as HTMLButtonElement;

  if (filt.length > 0) {
    btnLim.classList.remove("noMostrar");
  } else {
    btnLim.classList.add("noMostrar");
  }
}

export function filtroSearch(param: boolean, DATA: Array<PokemonClass>) {
  let input = inputBusc() as HTMLInputElement;
  if (input != null) {
    let filter: string = input.value.toLowerCase();
    console.log(filter);

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
}

function buscarFiltroSearch(name: string) {
  let ayu = ayudaPoke() as HTMLDataListElement;
  let option: HTMLOptionElement = document.createElement("option");
  option.value = name;
  ayu.appendChild(option);
}
