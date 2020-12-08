import { IPokemon } from '../types/pokemon';
import { IUser } from '../types/user';

export const API_URL = 'http://localhost:8080';

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
    if (response.status === 401) {
      throw new Error('Invalid Login');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const signup = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 401) {
      throw new Error('Invalid signup');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const pokedex = async (user: IUser) => {
  try {
    const response = await fetch(`${API_URL}/pokedex`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const pokemons = async () => {
  try {
    const response = await fetch(`${API_URL}/pokemons`);
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};


export const addPokedexPokemon = async (pokemon: IPokemon, user: IUser) => {
  try {
    const response = await fetch(`${API_URL}/addpokemon`, {
      method: 'POST',
      body: JSON.stringify({
        id: pokemon.id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    if (response.status === 401) {
      throw new Error(await response.json());
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePokedexPokemon = async (pokemon: IPokemon, user: IUser) => {
  try {
    const response = await fetch(`${API_URL}/deletepokemon`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: pokemon.id
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    });
    if (response.status === 401) {
      throw new Error(await response.json());
    }
    return await response.json();
  } catch (error) {
    throw new Error(error);
  }
};