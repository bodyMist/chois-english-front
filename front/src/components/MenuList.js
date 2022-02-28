import React from 'react';
import styled from 'styled-components';

const MenuListBlock = styled.div`
  border-bottom: 1px solid #e9ecef;
`;
const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;
`;
const Item = styled.li`
  padding: 10px 20px 10px 20px;
  margin: 5px 10px 5px 10px;
  margin-left: -1px;
  display: inline-block;
  border: 1px solid #e9ecef;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 8px;
`;
function MenuList() {
  return (
    <MenuListBlock>
      <ItemList>
        <Item>사진변환</Item>
        <Item>단어퀴즈</Item>
        <Item>문장퀴즈</Item>
        <Item>음성퀴즈</Item>
      </ItemList>
    </MenuListBlock>
  );
}

export default MenuList;
