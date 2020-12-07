import React from 'react';
import { pokemons as fetchPokemons } from '../utils/api';
import { Select } from 'antd';
import { IPokemon, Languages } from '../types/pokemon';
const { Option } = Select;

const renderOptions = (pokemons: IPokemon[], language: Languages): React.ReactElement[] => {
  return pokemons.map(pokemon => {
    return <Option value={pokemon.id}>{pokemon.name[language]}</Option>
  });
};

const Pokemons: React.FunctionComponent<{}> = () => {
  const [pokemons, setPokemons] = React.useState<IPokemon[] | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);

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

  const filterOption = (input: string, option: any) => {
    return option.props.children && option.props.children.toLowerCase().indexOf(input.toLowerCase()) !== -1;
  };

  const onSelect = (key: any): void => {
    console.log(key);
  };

  return (
    <div>
      { pokemons && (
        <Select
          loading={loading}
          placeholder="Search Pokemon"
          onChange={onSelect}
          notFoundContent="No results"
          showSearch
          filterOption={filterOption}
          style={{ width: 200 }}
        >
          { renderOptions(pokemons, 'english') }
        </Select>
      )}
    </div>
  );
}

export default Pokemons;
