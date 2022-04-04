import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMenuDispatch } from '../../MenuContext';
import { useUserDispatch, useUserState } from '../../UserContext';
import { css } from 'styled-components';
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
  ${(props) =>
    props.islogin &&
    css`
      display: none;
    `}
`;
function Nav() {
  const menuDispatch = useMenuDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  console.log(userState);
  const logout = () => {
    userDispatch({ type: 'LOGOUT' });
    menuDispatch({ type: 'RESET' });
  };
  return (
    <NavContainer>
      <StyledLink
        to="/login"
        onClick={() => menuDispatch({ type: 'RESET' })}
        islogin={userState.result}
      >
        로그인
      </StyledLink>
      <StyledLink
        to="/user"
        onClick={() => menuDispatch({ type: 'RESET' })}
        islogin={!userState.result}
      >
        안녕하세요 {userState.name} 님
      </StyledLink>
      <StyledLink to="/" onClick={logout} islogin={!userState.result}>
        &nbsp;로그아웃
      </StyledLink>
    </NavContainer>
  );
}

export default Nav;
