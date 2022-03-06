import React from 'react';
import styled from 'styled-components';

const TemplateBlock = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

function Template({ children }) {
  return <TemplateBlock>{children}</TemplateBlock>;
}

export default Template;
