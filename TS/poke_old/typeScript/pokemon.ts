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
