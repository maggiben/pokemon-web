export type Languages = 'english' | 'japanese' | 'chinese' | 'french';

export type LanguagesMap<T> = { 
  [language in Languages]: T 
};

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