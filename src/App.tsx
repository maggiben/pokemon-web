import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Icon from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { login } from './utils/api';
import Pokemons from './sections/pokemons';
import Login from './sections/login';
import { IUser } from './types/user';
import { TPokedex } from './types/pokemon';
import './App.css';

const { Header, Content, Footer } = Layout;


const App: React.FunctionComponent<{}> = () => {
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [pokedex, setPokedex] = React.useState<TPokedex | undefined>(undefined);
  const [showLoginModal, setShowLoginModal] = React.useState<boolean>(false);

  const showLogin = (): void => {
    setShowLoginModal(true);
  }

  const hideLoginModal = (): void => {
    setShowLoginModal(false);
  };

  const handleLogin = async (username: string, password: string): void => {
    const user = await login(username, password);
    if (user) {
      setUser(user);
      setShowLoginModal(false);
    }
  };

  return (
    <Layout className="layout" style={{height:"100vh"}}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          {!user ? (
                    <Menu.SubMenu style={{float: 'right'}} title={<span><UserOutlined /></span>}>
                      <Menu.Item 
                        key="setting:1"
                        onClick={showLogin}
                      >Login</Menu.Item>
                    </Menu.SubMenu>) : 
                  ( <Menu.SubMenu style={{float: 'right'}} title={<span><UserOutlined />{user.username}</span>}></Menu.SubMenu>)
          }
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <h1>Content</h1>
        <Pokemons />
        {showLoginModal && <Login isModalVisible={showLoginModal} onCancel={hideLoginModal} handleLogin={handleLogin}/>}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
