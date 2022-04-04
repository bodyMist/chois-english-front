import React, { createContext, useContext, useReducer } from 'react';

const user = [
  {
    id: '11',
    password: '11',
  },
];

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
      };
  }
}

const UserStateContext = createContext();
const UserDispatchContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, user);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUserState() {
  return useContext(UserStateContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}
