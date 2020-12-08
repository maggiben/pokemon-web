import React from 'react';
import { Select } from 'antd';
import Pokemon from './pokemon';
import { pokemons as fetchPokemons } from '../utils/api';
import { IPokemon, Languages, TPokedex } from '../types/pokemon';
import { IUser } from '../types/user';
const { Option } = Select;

interface IPokemonsProps {
  user?: IUser;
  pokedex?: TPokedex;
  onAddPokemonToPokedex: (pokemon: IPokemon) => void;
  language: Languages;
}

const Pokemons: React.FunctionComponent<IPokemonsProps> = (props) => {
  const { user, pokedex, onAddPokemonToPokedex, language } = props;
  const [pokemons, setPokemons] = React.useState<IPokemon[] | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string | undefined>(undefined);
  const [selectedPokemon, setSelectedPokemon] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchPokemons();
      return response;
    };
    fetchData().then(data => {
      setPokemons(data);
      setLoading(false);
    });
  }, []);

  const renderOptions = (pokemons: IPokemon[], language: Languages, search: string | undefined): React.ReactElement[] => {
    if (search) {
      return pokemons
      .filter(pokemon => pokemon.name[language].toLowerCase().includes(search.toLowerCase()))
      .map(pokemon => <Option key={pokemon.id} value={pokemon.id}>{pokemon.name[language]}</Option>);
    }
    return pokemons.map(pokemon => <Option key={pokemon.id} value={pokemon.id}>{pokemon.name[language]}</Option>);  
  };
  
  const renderPokemons = (pokemons: IPokemon[], language: Languages, search: string | undefined): React.ReactElement[] => {
    if (search) {
      return pokemons
      .filter(pokemon => pokemon.name[language].toLowerCase().includes(search.toLowerCase()))
      .map(pokemon => (
        <li key={pokemon.id}>
          <Pokemon key={pokemon.id} user={user} pokedex={pokedex} pokemon={pokemon} language={language} onAddPokemonToPokedex={onAddPokemonToPokedex} />
        </li>
      ));
    }
    return pokemons
    .map(pokemon => (
      <li key={pokemon.id}>
        <Pokemon key={pokemon.id} user={user} pokedex={pokedex} pokemon={pokemon} language={language} onAddPokemonToPokedex={onAddPokemonToPokedex} />
      </li>
    ));
  };

  const renderPokemon = (pokemons: IPokemon[], language: Languages, selectedPokemon: number): React.ReactElement => {
    const pokemon = pokemons.find(pokemon => pokemon.id === selectedPokemon);
    if (pokemon) {
      return (
        <li key={pokemon.id}>
          <Pokemon user={user} pokemon={pokemon} pokedex={pokedex} language={language} onAddPokemonToPokedex={onAddPokemonToPokedex} />
        </li>
      );
    }
    return (<></>);
  };

  const handleSearch = (value: string) => {
    setSelectedPokemon(undefined);
    setSearch(value);
  };

  const handleChange = (value: number) => {
    setSelectedPokemon(value);
  };

  const selectStyle = {
    minWidth: '20rem'
  };

  return (
    <div style={{width: '100%'}}>
      { pokemons && (
        <Select 
          showSearch
          value={undefined}
          style={selectStyle}
          placeholder="Search Pokemon"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          className="pokemons-search"
        >
        { renderOptions(pokemons, language, search) }
        </Select>
      )}
      <ul className="pokemons">
        { !loading && pokemons && !selectedPokemon && (renderPokemons(pokemons, language, search))}
        { !loading && pokemons && selectedPokemon && (renderPokemon(pokemons, language, selectedPokemon))}
        { loading && <div>Loading</div> }
      </ul>
    </div>
  );
}

export default Pokemons;
