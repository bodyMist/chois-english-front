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
  .isLogin {
    &.Login {
      display: none;
    }
  }
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
  const menuDispatch = useMenuDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const logout = () => {
    localStorage.clear();
    userDispatch({ type: 'LOGOUT' });
    menuDispatch({ type: 'RESET' });
  };
  let isLogin = userState.result;
  let name = userState.name;
  const userData = JSON.parse(localStorage.getItem('userData'));
  if (userData) {
    isLogin = userData.member.result;
    name = userData.member.result.name;
  }
  return (
    <NavContainer>
      <StyledLink
        to="/login"
        onClick={() => menuDispatch({ type: 'RESET' })}
        className={`isLogin ${isLogin === 0 ? '' : 'Login'}`}
      >
        로그인
      </StyledLink>
      <StyledLink
        to="/user"
        onClick={() => menuDispatch({ type: 'RESET' })}
        className={`isLogin ${isLogin === 0 ? 'Login' : ''}`}
      >
        안녕하세요 {name} 님
      </StyledLink>
      <StyledLink
        to="/"
        onClick={logout}
        className={`isLogin ${isLogin === 0 ? 'Login' : ''}`}
      >
        &nbsp;로그아웃
      </StyledLink>
    </NavContainer>
  );
}

export default React.memo(Nav);
