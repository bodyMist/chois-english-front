import React from 'react';
import styled from 'styled-components';

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

function Head() {
  return (
    <HeadBlock>
      <h1>CHOIS-ENGLISH</h1>
    </HeadBlock>
  );
}

export default Head;
