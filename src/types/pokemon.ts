export interface IPokemonBase {
  HP: number;
  Attack: number;
  Defense: number;
  'Sp. Attack': number;
  'Sp. Defense': number;
  Speed: number;
}

export interface IPokemon {
  id: number;
  name: any;
  type: string[];
  base?: IPokemonBase;
}

export type TPokedex = IPokemon[];