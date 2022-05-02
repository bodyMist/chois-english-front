import React from 'react';
import styled from 'styled-components';
import { useMenuDispatch, useMenuState } from '../../MenuContext';
import { StyledLink } from '../Styles';

const MenuListBlock = styled.div`
  /* border-bottom: 1px solid #e9ecef; */
  background-color: white;
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
