import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMenuDispatch } from '../../MenuContext';
import { useUserDispatch, useUserState } from '../../UserContext';
const NavContainer = styled.div`
  position: absolute;
  top: 20%;
  right: 5%;
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
  // localStorage.clear();
  const logout = () => {
    localStorage.clear();
    userDispatch({ type: 'LOGOUT' });
    menuDispatch({ type: 'RESET' });
  };
  useEffect(() => {
    if (typeof window !== 'undefined' && userState.result === 0) {
      const data = JSON.parse(localStorage.getItem('userData'));
      if (data !== null) {
        userDispatch({ type: 'LOGIN', data });
      }
    }
    // console.log(userState.id);
  }, [userState, userDispatch]);
  let isLogin = userState.result;
  let name = userState.name;
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
        to="/userpage"
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
