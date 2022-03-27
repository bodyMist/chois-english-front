import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMenuDispatch } from '../../MenuContext';
const NavContainer = styled.div`
  position: absolute;
  top: 20%;
  right: 2%;
`;
const StyledLink = styled(Link)`
  margin-left: auto;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: black;
    text-decoration: none;
  }
`;
function Nav() {
  const dispatch = useMenuDispatch();
  return (
    <NavContainer>
      <StyledLink to="/login" onClick={() => dispatch({ type: 'RESET' })}>
        로그인
      </StyledLink>
    </NavContainer>
  );
}

export default Nav;
