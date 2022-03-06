import React from 'react';
import styled from 'styled-components';
import Head from './Head';
import MainBoard from './MainBoard';
import MenuList from './MenuList';
import Template from './Template';

const Header = styled.div`
  position: sticky;
  top: 0;
`;

function Main() {
  return (
    <Template>
      <MainBoard></MainBoard>
    </Template>
  );
}

export default Main;
