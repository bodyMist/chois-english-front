import React from 'react';
import styled from 'styled-components';

const ExpBlock = styled.div`
  margin-top: 10px;
  text-align: center;
  h1 {
    margin: 0;
    font-size: 24px;
    color: #343a40;
  }
`;

function Explanation() {
  return (
    <ExpBlock>
      <h1>나는 바보다.</h1>
    </ExpBlock>
  );
}

export default Explanation;
