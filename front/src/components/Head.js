import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMenuDispatch, useMenuState } from '../MenuContext';

const HeadBlock = styled.div`
  padding-top: 12px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
  text-align: center;
  h1 {
    margin: 0;
    font-size: 32px;
    color: #343a40;
  }
`;
const StyledLink = styled(Link)`
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
function Head() {
  const dispatch = useMenuDispatch();
  return (
    <HeadBlock>
      <StyledLink to="/" onClick={() => dispatch({ type: 'RESET' })}>
        <h1>CHOIS-ENGLISH</h1>
      </StyledLink>
    </HeadBlock>
  );
}

export default Head;
