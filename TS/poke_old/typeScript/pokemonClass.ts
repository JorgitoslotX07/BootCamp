import { Pokemon } from "./pokemon";

export class PokemonClass implements Pokemon {
  id: number;
  img: string;
  name: string;
  tipo: string[];
  url: string;
  visibilidad: boolean;

  constructor(
    id: number,
    img: string,
    name: string,
    tipo: string[],
    url: string,
    visibilidad: boolean
  ) {
    this.id = id;
    this.img = img;
    this.name = name;
    this.tipo = tipo;
    this.url = url;
    this.visibilidad = visibilidad;
  }

  cambiarVisibilidad(): void {
    this.visibilidad = !this.visibilidad;
  }
}
