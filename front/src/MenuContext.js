import React, { createContext, useContext, useReducer } from 'react';

const menuArr = [
  { id: 1, name: '사진변환', link: '/phototransfer', focused: false },
  { id: 2, name: '단어퀴즈', link: '/vocaquiz', focused: false },
  { id: 3, name: '문장퀴즈', link: '/sentencequiz', focused: false },
  { id: 4, name: '음성퀴즈', link: '/voicequiz', focused: false },
];

function menuReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.map((menu) =>
        menu.id === action.index + 1
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
