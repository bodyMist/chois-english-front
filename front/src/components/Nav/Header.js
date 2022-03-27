import React from 'react';
import styled from 'styled-components';
import MenuList from './MenuList';
import Logo from './Logo';

const HeaderContainer = styled.div`
  z-index: 99;
  position: sticky;
  top: 0;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <MenuList />
    </HeaderContainer>
  );
}

export default Header;
