import { Pokemon, PokemonDetalle, PokeSprites } from "./pokemon";

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

export class PokemonDetalleClass implements PokemonDetalle {
  id: number;
  name: string;
  abilities: Array<any>;
  height: number;
  base_experience: number;
  types: Array<any>;
  sprites: PokeSprites;

  constructor(
    id: number,
    name: string,
    abilities: Array<any>,
    height: number,
    base_experience: number,
    types: Array<any>,
    sprites: PokeSprites
  ) {
    this.id = id;
    this.name = name;
    this.abilities = abilities;
    this.height = height;
    this.base_experience = base_experience;
    this.types = types;
    this.sprites = sprites;
  }
}
