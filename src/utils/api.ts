import { IPokemon } from '../types/pokemon';

export const API_URL = 'http://localhost:3000';

export const login = async (username: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};


export const addPokedexPokemon = async (pokemon: IPokemon) => {
  try {
    const response = await fetch(`${API_URL}/addpokemon`, {
      method: 'POST',
      body: JSON.stringify({
        id: pokemon.id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export const deletePokedexPokemon = async (pokemon: IPokemon) => {
  try {
    const response = await fetch(`${API_URL}/deletepokemon`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: pokemon.id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};