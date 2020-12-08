import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, FlagOutlined } from '@ant-design/icons';
import { login, signup, pokedex as fetchPokedex } from './utils/api';
import Pokemons from './sections/pokemons';
import Pokedex from './sections/pokedex';
import Login from './sections/login';
import SignUp from './sections/signup';
import Error from './sections/error';
import { IUser } from './types/user';
import { IPokemon, TPokedex, Languages } from './types/pokemon';
import './App.css';

const { Header, Content } = Layout;
const languages = ['english', 'japanese', 'chinese', 'french'];

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
          return <Pokemons onAddPokemonToPokedex={onAddPokemonToPokedex} language={language} pokedex={pokedex} user={user}/>;
        case 'pokedex':
          if (pokedex) {
            return <Pokedex pokedex={pokedex} language={language} />;
          } 
          return <div>Pokedex</div>; 
        default:
          return <h1>Empty</h1>;
      }
    }
    return <Pokemons onAddPokemonToPokedex={onAddPokemonToPokedex} language={language} pokedex={pokedex} user={user}/>;
  };

  const showSignUp = (): void => {
    setShowSignUpModal(true);
  };

  const hideSignUpModal = (): void => {
    setShowSignUpModal(false);
  };

  const handleSignUp = async (username: string, email: string, password: string) => {
    try {
      const user = await signup(username, email, password);
      if (user) {
        const pokedex = await fetchPokedex(user);
        if (pokedex) {
          console.log('pokedex', pokedex)
          setPokedex(pokedex);
        }
        setUser(user);
        setShowSignUpModal(false);
      } else {
        setUser(undefined);
        setShowSignUpModal(false);
        setError('Could not signup user');
        setShowErrorModal(true);
      }
    } catch (error) {
      setShowSignUpModal(false);
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const showLogin = (): void => {
    setShowLoginModal(true);
  };

  const hideLoginModal = (): void => {
    setShowLoginModal(false);
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const user = await login(username, password);
      if (user) {
        const pokedex = await fetchPokedex(user);
        if (pokedex) {
          console.log('pokedex', pokedex)
          setPokedex(pokedex);
        }
        setUser(user);
        setShowLoginModal(false);
      } else {
        setUser(undefined);
        setShowLoginModal(false);
        setError('Could not fetch user');
        setShowErrorModal(true);
      } 
    } catch (error) {
      setShowLoginModal(false);
      setError(error.message);
      setShowErrorModal(true);
    }
  };

  const logOut = (): void => {
    setUser(undefined);
  };

  const onAddPokemonToPokedex = (pokemon: IPokemon) => {
    console.log(pokemon);
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
                onClick={() => setLanguage(language as Languages)}
              >{language}</Menu.Item>
            )))}
          </Menu.SubMenu>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', height: '100%' }}>
        <div className="site-layout-content">
          {renderSection(section, user)}
          <Login isModalVisible={showLoginModal} onCancel={hideLoginModal} handleLogin={handleLogin}/>
          {showSignUpModal && <SignUp isModalVisible={showSignUpModal} onCancel={hideSignUpModal} handleSignUp={handleSignUp}/>}
          {showErrorModal && <Error isModalVisible={showErrorModal} onCancel={(): void => setShowErrorModal(false)}error={error}/>}
        </div>
      </Content>
    </Layout>
  );
}

export default App;
