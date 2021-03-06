import React from 'react';
import { Layout, Menu, Empty } from 'antd';
import { UserOutlined, FlagOutlined } from '@ant-design/icons';
import { login, signup, pokedex as fetchPokedex, deletePokedexPokemon, addPokedexPokemon, setlanguage } from './utils/api';
import languages from './utils/languages';
import Pokemons from './sections/pokemons';
import Pokedex from './sections/pokedex';
import Login from './sections/login';
import SignUp from './sections/signup';
import Error from './sections/error';
import { IUser } from './types/user';
import { IPokemon, TPokedex } from './types/pokemon';
import { Languages } from './types/user'; 
import './App.css';

const { Header, Content } = Layout;

const App: React.FunctionComponent<{}> = () => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [language, setLanguage] = React.useState<Languages>('english');
  const [pokedex, setPokedex] = React.useState<TPokedex | undefined>(undefined);
  const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);
  const [section, setSection] = React.useState<string>('pokemons');
  const [showSignUpModal, setShowSignUpModal] = React.useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | undefined>(undefined)

  const renderSection = (section: string, user: IUser | undefined): React.ReactElement => {
    if (user) {
      switch(section) {
        case 'pokemons':
          return <Pokemons onAddPokedexPokemon={onAddPokedexPokemon} onDeletePokedexPokemon={onDeletePokedexPokemon} language={language} pokedex={pokedex} user={user} showError={showError} />;
        case 'pokedex':
          if (pokedex && user) {
            return <Pokedex pokedex={pokedex} language={language} onDeletePokedexPokemon={onDeletePokedexPokemon}/>;
          } 
          return <Empty />;
        default:
          return <Empty />;
      }
    }
    return <Pokemons onAddPokedexPokemon={onAddPokedexPokemon} onDeletePokedexPokemon={onDeletePokedexPokemon} language={language} pokedex={pokedex} user={user} showError={showError} />;
  };

  const showError = (message?: string): void => {
    setError(message);
    setShowErrorModal(true);
  };

  const loadPokedex = async (user: IUser): Promise<void> => {
    try {
      const pokedex = await fetchPokedex(user);
      if (pokedex) {
        setPokedex(pokedex);
      }
    } catch (error) {
      showError(error.message);
    }
  };

  const loadUser = async (user?: IUser): Promise<void> => {
    if (user) {
      await loadPokedex(user);
      setUser(user);
      setLanguage(user.language);
      setSection('pokemons');
    } else {
      showError('Could not signup user');
    }
  }

  const showSignUp = (): void => {
    setShowSignUpModal(true);
  };

  const hideSignUpModal = (): void => {
    setShowSignUpModal(false);
  };

  const handleSignUp = async (username: string, email: string, language: Languages, password: string): Promise<void> => {
    try {
      const user = await signup(username, email, language, password);
      await loadUser(user);
      hideSignUpModal();
    } catch (error) {
      showError(error.message);
    }
  };

  const showLogin = (): void => {
    setShowLoginModal(true);
  };

  const hideLoginModal = (): void => {
    setShowLoginModal(false);
  };

  const handleLogin = async (username: string, password: string): Promise<void> => {
    try {
      const user = await login(username, password);
      await loadUser(user);
      hideLoginModal();
    } catch (error) {
      showError(error.message);
    }
  };

  const logOut = (): void => {
    setUser(undefined);
    setPokedex(undefined);
    setSection('pokemons');
  };

  const handleSetLanguage = async (language: Languages): Promise<void> => {
    if (user) {
      try {
        const result = await setlanguage(language, user);
        if (result) {
          setLanguage(language as Languages);
        } else {
          showError('Could not set language');
        }
      } catch (error) {
        showError(error.message);
      }
    } else {
      showError('User not logged in');
    }
  };

  const onAddPokedexPokemon = async (pokemon: IPokemon): Promise<void> => {
    if (user) {
      try {
        const result = await addPokedexPokemon(pokemon, user);
        if (result) {
          await loadPokedex(user);
        } else {
          showError('Cannot add more pokemons to your pokedex');
        }
      } catch (error) {
        showError(error.message);
      }
      return;
    }
    showError('User not logged in');
  };

  const onDeletePokedexPokemon = async (pokemon: IPokemon): Promise<void> => {
    if (user) {
      try {
        await deletePokedexPokemon(pokemon, user);
        await loadPokedex(user);
      } catch (error) {
        showError(error.message);
      }
      return;
    }
    showError('User not logged in');
  };

  const hideErrorModal = (): void => {
    setShowErrorModal(false);
  };

  return (
    <Layout className="layout" style={{ height: '100%' }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={() => setSection('pokemons')}>Pokemons</Menu.Item>
          {user && ( <Menu.Item key="2" onClick={() => setSection('pokedex')}>Pokedex</Menu.Item>) }
          {!user ? (
              <Menu.SubMenu style={{float: 'right'}} title={<span><UserOutlined /></span>}>
                <Menu.Item 
                  key="setting:1"
                  onClick={showLogin}
                >Login</Menu.Item>
                <Menu.Item 
                  key="setting:2"
                  onClick={showSignUp}
                >SignUp</Menu.Item>
              </Menu.SubMenu>) : 
            ( 
              <Menu.SubMenu style={{float: 'right'}} title={<span><UserOutlined />{user.username}</span>}>
                <Menu.Item 
                  key="setting:1"
                  onClick={logOut}
                >Log out</Menu.Item>
              </Menu.SubMenu>
            )
          }
          <Menu.SubMenu style={{float: 'right'}} title={<span><FlagOutlined />{language}</span>}>
            {languages && (languages.map(language => (
              <Menu.Item 
                key={`lang-${language}`}
                onClick={() => handleSetLanguage(language as Languages)}
              >{language}</Menu.Item>
            )))}
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', height: '100%' }}>
        <div className="site-layout-content">
          {renderSection(section, user)}
          <Login isModalVisible={showLoginModal} onCancel={hideLoginModal} handleLogin={handleLogin}/>
          <SignUp isModalVisible={showSignUpModal} onCancel={hideSignUpModal} handleSignUp={handleSignUp}/>
          <Error isModalVisible={showErrorModal} onCancel={hideErrorModal}error={error}/>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
