import React from 'react';
import MainBoard from './MainBoard';
import Template from './Template';

function Main() {
  return (
    <Template>
      <MainBoard></MainBoard>
    </Template>
  );
}

export default React.memo(Main);
