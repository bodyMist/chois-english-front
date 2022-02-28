import React from 'react';
import styled from 'styled-components';

const TemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  background: white;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
`;

function Template({ children }) {
  return <TemplateBlock>{children}</TemplateBlock>;
}

export default Template;
