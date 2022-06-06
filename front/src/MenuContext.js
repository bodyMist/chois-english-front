import React, { createContext, useContext, useReducer } from 'react';

const menuArr = [
  // { id: 0, name: '사진변환', link: '/phototransfer', focused: false },
  { id: 0, name: '단어퀴즈', type: 'word', focused: false },
  { id: 1, name: '문장퀴즈', type: 'sentence', focused: false },
];

function menuReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.map((menu) =>
        menu.id === action.index
          ? { ...menu, focused: true }
          : menu.focused === true
          ? { ...menu, focused: false }
          : menu
      );
    case 'RESET':
      return state.map((menu) => (menu = { ...menu, focused: false }));
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const MenuStateContext = createContext();
const MenuDispatchContext = createContext();

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(menuReducer, menuArr);
  return (
    <MenuStateContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuStateContext.Provider>
  );
}

export function useMenuState() {
  return useContext(MenuStateContext);
}

export function useMenuDispatch() {
  return useContext(MenuDispatchContext);
}
