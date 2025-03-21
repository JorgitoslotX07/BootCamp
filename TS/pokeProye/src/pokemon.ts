export interface Pokemon {
  id: number;
  img: string;
  name: string;
  tipo: Array<string>;
  url: string;
  visibilidad: boolean;
}

export interface PokemonData {
  img: string;
  tipo: string[];
}

export interface PokemonDetalle {
  id: number;
  name: string;
  abilities: Array<any>;
  height: number;
  base_experience: number;
  types: Array<any>;
  sprites: PokeSprites;
}

export interface PokeSprites {
  front_default: string;
  front_shiny: string;
}
