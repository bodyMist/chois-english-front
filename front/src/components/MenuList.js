import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMenuDispatch, useMenuState } from '../MenuContext';

const MenuListBlock = styled.div`
  border-bottom: 1px solid #e9ecef;
`;

const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;

  .focused {
    background-color: lightgreen;
  }
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

function MenuList() {
  const menus = useMenuState();
  const dispatch = useMenuDispatch();
  return (
    <MenuListBlock>
      <ItemList>
        {menus.map((menu, index) => {
          return (
            <Item
              key={index}
              className={menu.focused === true ? 'focused' : ''}
            >
              <StyledLink
                to={menu.link}
                onClick={() => dispatch({ type: 'TOGGLE', index })}
              >
                {menu.name}
              </StyledLink>
            </Item>
          );
        })}
      </ItemList>
    </MenuListBlock>
  );
}

export default MenuList;
