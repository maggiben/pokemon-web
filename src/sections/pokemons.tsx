import React from 'react';
import { Select, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Pokemon from './pokemon';
import { pokemons as fetchPokemons } from '../utils/api';
import { IPokemon, Languages, TPokedex } from '../types/pokemon';
import { IUser } from '../types/user';
const { Option } = Select;

interface IPokemonsProps {
  user?: IUser;
  pokedex?: TPokedex;
  onAddPokedexPokemon: (pokemon: IPokemon) => Promise<void>;
  onDeletePokedexPokemon: (pokemon: IPokemon) => Promise<void>;
  language: Languages;
  showError: (message?: string) => void;
}

const Pokemons: React.FunctionComponent<IPokemonsProps> = (props) => {
  const { user, pokedex, onAddPokedexPokemon, onDeletePokedexPokemon, language, showError } = props;
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
    fetchData()
    .then(data => {
      setPokemons(data);
      setLoading(false);
    })
    .catch(error => {
      showError(error.message);
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
          <Pokemon user={user} pokedex={pokedex} pokemon={pokemon} language={language} onAddPokedexPokemon={onAddPokedexPokemon} onDeletePokedexPokemon={onDeletePokedexPokemon} />
        </li>
      ));
    }
    return pokemons
    .map(pokemon => (
      <li key={pokemon.id}>
        <Pokemon user={user} pokedex={pokedex} pokemon={pokemon} language={language} onAddPokedexPokemon={onAddPokedexPokemon} onDeletePokedexPokemon={onDeletePokedexPokemon} />
      </li>
    ));
  };

  const renderPokemon = (pokemons: IPokemon[], language: Languages, selectedPokemon: number): React.ReactElement => {
    const pokemon = pokemons.find(pokemon => pokemon.id === selectedPokemon);
    if (pokemon) {
      return (
        <li key={pokemon.id}>
          <Pokemon user={user} pokemon={pokemon} pokedex={pokedex} language={language} onAddPokedexPokemon={onAddPokedexPokemon} onDeletePokedexPokemon={onDeletePokedexPokemon} />
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

  const clearSelected = () => {
    setSelectedPokemon(undefined);
    setSearch(undefined);
  }

  const selectStyle = {
    minWidth: '20rem'
  };

  return (
    <div style={{width: '100%'}}>
      { pokemons && (
        <Select 
          showSearch
          value={selectedPokemon}
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
      { selectedPokemon && <Button icon={<CloseOutlined />} onClick={clearSelected}>Clear selected</Button>}
      <ul className="pokemons">
        { !loading && pokemons && !selectedPokemon && (renderPokemons(pokemons, language, search))}
        { !loading && pokemons && selectedPokemon && (renderPokemon(pokemons, language, selectedPokemon))}
        { loading && <div>Loading</div> }
      </ul>
    </div>
  );
}

export default Pokemons;
