import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import './App.css';
import Head from './components/Head';
import MenuList from './components/MenuList';
import PhotoTransfer from './components/menus/PhotoTransfer';
import Main from './components/Main';
import VocaQuiz from './components/menus/VocaQuiz';
import SentenceQuiz from './components/menus/SentenceQuiz';
import VoiceQuiz from './components/menus/VoiceQuiz';
import { MenuProvider, useMenuState } from './MenuContext';

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
      <MenuProvider>
        <GlobalStyle />
        <Header>
          <Head />
          <MenuList></MenuList>
        </Header>
        <Routes>
          <>
            <Route path="/" element={<Main />} />
            <Route path="/phototransfer" element={<PhotoTransfer />} />
            <Route path="/vocaquiz" element={<VocaQuiz />} />
            <Route path="/sentencequiz" element={<SentenceQuiz />} />
            <Route path="/voicequiz" element={<VoiceQuiz />} />
          </>
        </Routes>
      </MenuProvider>
    </BrowserRouter>
  );
}

export default App;
