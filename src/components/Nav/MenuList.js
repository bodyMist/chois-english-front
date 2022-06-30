import React from 'react';
import styled from 'styled-components';
import { useMenuDispatch, useMenuState } from '../../MenuContext';
import { useTransferState } from '../../TransferContext';
import { StyledLink } from '../Styles';

const MenuListBlock = styled.div`
  /* border-bottom: 1px solid #e9ecef; */
  background-color: white;
  display: ${(props) => (props.loaded ? 'block' : 'none')};
`;

const ItemList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;

  .focused {
    background-color: #1890ff;
  }
`;

const Item = styled.li`
  padding: 5px 10px 5px 10px;
  margin: 5px 10px 5px 10px;
  margin-left: -1px;
  display: inline-block;
  border: 1px solid #e9ecef;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  border-radius: 3px;
`;

const StyledBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.Selected === true ? 'white' : 'black')};
`;
function MenuList() {
  const menus = useMenuState();
  const dispatch = useMenuDispatch();
  const loaded = useTransferState().loaded;
  return (
    <MenuListBlock loaded={loaded}>
      <ItemList>
        {menus.map((menu, index) => {
          return (
            <Item
              key={index}
              className={menu.focused === true ? 'focused' : ''}
            >
              <StyledBtn
                onClick={() => dispatch({ type: 'TOGGLE', index })}
                Selected={menu.focused}
              >
                {menu.name}
              </StyledBtn>
            </Item>
          );
        })}
      </ItemList>
    </MenuListBlock>
  );
}

export default MenuList;
