import React from 'react';
import { IPokemon, TPokedex, Languages } from '../types/pokemon';

interface IPokedexProps {
  pokedex: TPokedex;
  language: Languages;
}
const Pokedex: React.FunctionComponent<IPokedexProps> = (props) => {
  const { pokedex, language } = props;
  return (
    <div>
      {
        pokedex.map((pokemon: IPokemon) => {
          return (
            <span>{pokemon.name[language]}</span>
          );
        })
      }
    </div>
  );
}

export default Pokedex;
