import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import './App.css';
import MainBoard from './components/MainBoard';
import Head from './components/Head';
import MenuList from './components/MenuList';
import Template from './components/Template';
import PhotoTransfer from './components/PhotoTransfer';
import Main from './components/Main';

const GlobalStyle = createGlobalStyle`
  body {
    background: white;
  }
`;
const Header = styled.div`
  position: sticky;
  top: 0;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header>
        <Head />
        <MenuList></MenuList>
      </Header>
      <Routes>
        <>
          <Route path="/" element={<Main />} />
          <Route path="/phototransfer" element={<PhotoTransfer />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
