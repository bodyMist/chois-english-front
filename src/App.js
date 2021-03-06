import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './App.css';
import PhotoTransfer from './components/menus/PhotoTransfer';
import Main from './components/Main';
import { MenuProvider } from './MenuContext';
import Header from './components/Nav/Header';
import Login from './components/Nav/Login/Login';
import Register from './components/Nav/Login/Register';
import { TransferProvider } from './TransferContext';
import { UserProvider } from './UserContext';
import UserPage from './components/UserPage';
import Quiz from './components/menus/Quiz';

const GlobalStyle = createGlobalStyle`
  body {
    background: white;
  }
`;

const AppProvider = ({ contexts, children }) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

function App() {
  // localStorage.clear();
  return (
    <BrowserRouter>
      <AppProvider contexts={[MenuProvider, TransferProvider, UserProvider]}>
        {/* <Template> */}
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/phototransfer" element={<PhotoTransfer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
        {/* </Template> */}
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
