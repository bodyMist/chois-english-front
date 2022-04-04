import React, { createContext, useContext, useReducer } from 'react';

const user = [
  {
    account: '',
    email: '',
    images: [],
    name: '',
    password: '',
    result: false,
  },
];

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.data);
      const member = action.data.member.result;
      const result = action.data.result;
      return {
        ...state,
        account: member.account,
        email: member.email,
        images: member.images,
        name: member.name,
        password: member.password,
        result: result,
      };
    case 'LOGOUT':
      return {
        ...state,
        account: '',
        email: '',
        images: [],
        name: '',
        password: '',
        result: false,
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
