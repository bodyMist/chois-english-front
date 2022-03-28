import React from 'react';
import { StyledLink } from '../Styles';
import styled from 'styled-components';
import { useMenuDispatch } from '../../MenuContext';
import Nav from './Nav';

const HeadBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 12px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 32px;
    color: #343a40;
  }
`;

function Logo() {
  const dispatch = useMenuDispatch;
  return (
    <HeadBlock>
      <StyledLink to="/" onClick={() => dispatch({ type: 'RESET' })}>
        <h1>CHOIS-ENGLISH</h1>
      </StyledLink>
      <Nav></Nav>
    </HeadBlock>
  );
}

export default Logo;
