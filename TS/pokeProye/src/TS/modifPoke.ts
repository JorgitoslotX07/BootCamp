import { actualizarPokedex } from "../main";
import { PokemonClass } from "../pokemonClass";
import { guardarLocalStorage, subirNuevoLocalStorage } from "./localStorage";
import { actualizarTotal } from "./paginacion";
import {
  idPoke,
  imgPoke,
  namePoke,
  popUp,
  tipPoke,
  guardarPoke,
  cerrarPoke,
  anadirPokePopUp,
  anadirNombrePoke,
  anadirImgPoke,
  anadirTipoPoke,
} from "./util";

export function crearBox(
  emote: string,
  clase: string,
  po: PokemonClass,
  DATA: Array<PokemonClass>
) {
  let div: HTMLDivElement = document.createElement("div");
  div.className = clase;
  div.innerHTML = emote;

  div.addEventListener("click", (event) => {
    event.stopPropagation();

    if (clase == "basura") {
      let index: number = DATA.indexOf(po);
      DATA.splice(index, 1);
      guardarLocalStorage(DATA);
    } else {
      modificar(po, DATA);
    }
    actualizarPokedex();
    actualizarTotal(DATA);
  });

  return div;
}

function modificar(po: PokemonClass, DATA: Array<PokemonClass>) {
  let id = idPoke() as HTMLInputElement;
  let name = namePoke() as HTMLInputElement;
  let img = imgPoke() as HTMLInputElement;
  let tip = tipPoke() as HTMLInputElement;

  id.innerHTML = String(po.id);
  name.value = po.name;
  img.value = po.img;
  tip.value = po.tipo.join(", ");

  visibilidadPopUpEditar();
  botonesPopUpEditar(po, DATA);
}

function visibilidadPopUpEditar() {
  let pop: HTMLElement | null = popUp();
  if (pop) {
    pop.style.display = pop.style.display != "flex" ? "flex" : "none";
  }
}
export function visibilidadPopUpAnadir() {
  let pop: HTMLElement | null = anadirPokePopUp();
  if (pop) {
    pop.style.display = pop.style.display != "flex" ? "flex" : "none";
  }
}

function botonesPopUpEditar(po: PokemonClass, DATA: Array<PokemonClass>) {
  let guardar = guardarPoke() as HTMLButtonElement;
  let cerrar = cerrarPoke() as HTMLButtonElement;

  let index: number = DATA.indexOf(po);

  guardar.addEventListener("click", () => {
    let name = namePoke() as HTMLInputElement;
    let img = imgPoke() as HTMLInputElement;
    let tip = tipPoke() as HTMLInputElement;

    po.name = name.value.toLowerCase();
    po.img = img.value.toLowerCase();
    po.tipo = separarTipos(tip.value);

    DATA[index] = po;
    guardarLocalStorage(DATA);
    actualizarPokedex();
    visibilidadPopUpEditar();
  });

  cerrar.addEventListener("click", () => visibilidadPopUpEditar());
}

function separarTipos(param: String) {
  return param
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t !== "");
}

export function botonesPopUpAnadir(DATA: Array<PokemonClass>) {
  anadirNewPokePopUp(DATA);
  visibilidadPopUpAnadir();
  subirNuevoLocalStorage(DATA);
}

function anadirNewPokePopUp(DATA: Array<PokemonClass>) {
  let id = DATA.length;
  let name = anadirNombrePoke() as HTMLInputElement;
  let img = anadirImgPoke() as HTMLInputElement;
  let tipo = anadirTipoPoke() as HTMLInputElement;

  let newPoke = new PokemonClass(
    id,
    img.value,
    name.value,
    separarTipos(tipo.value),
    "",
    true
  );

  DATA.push(newPoke);
}
