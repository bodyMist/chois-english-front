import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import Explanation from './components/Explanation';
import Head from './components/Head';
import MenuList from './components/MenuList';
import Template from './components/Template';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Template>
        <Head />
        <MenuList></MenuList>
        <Explanation></Explanation>
      </Template>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
