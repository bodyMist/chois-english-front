import React, { createContext, useContext, useReducer } from 'react';
// 0: false, 1:true
const user = {
  id: '',
  email: '',
  images: [],
  name: '',
  password: '',
  result: 0,
};

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      const member = action.data.member;
      const result = action.data.result;
      return {
        ...state,
        id: member._id,
        email: member.email,
        images: member.images,
        name: member.name,
        password: member.password,
        result: result ? 1 : 0,
      };
    case 'LOGOUT':
      return {
        ...state,
        id: '',
        email: '',
        images: [],
        name: '',
        password: '',
        result: 0,
      };
    // case 'UPDATE':
    //   return {
    //     ...state,
    //     id: member._id,
    //     email: member.email,
    //     images: member.images,
    //     name: member.name,
    //     password: member.password,
    //     result: result ? 1 : 0,
    //   };
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
