import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { IUser } from './types/user';
import { TPokedex } from './types/pokemon';
import './App.css';

const { Header, Content, Footer } = Layout;


const App: React.FunctionComponent<{}> = () => {
  const [user, serUser] = React.useState<IUser | undefined>(undefined);
  const [pokedex, setPokedex] = React.useState<TPokedex | undefined>(undefined);

  return (
    <Layout className="layout" style={{height:"100vh"}}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">Content</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default App;
