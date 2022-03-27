import React, { createContext, useContext, useReducer } from 'react';

const Image = {
  image_file: '',
  preview_URL: 'img/default_image.png',
};
function TransferReducer(state, action) {
  switch (action.type) {
    case 'SAVE':
      return {
        image_file: action.imf,
        preview_URL: action.prv,
      };
    case 'DELETE':
      return {
        image_file: '',
        preview_URL: 'img/default_image.png',
      };
    // 파일 전송 시퀸스에 맞게 수정필요함.
    case 'SENDTOSERVER':
      return {
        image_file: action.imf,
        preview_URL: action.prv,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TransferStateContext = createContext();
const TransferDispatchCOntext = createContext();

export function TransferProvider({ children }) {
  const [state, dispatch] = useReducer(TransferReducer, Image);
  return (
    <TransferStateContext.Provider value={state}>
      <TransferDispatchCOntext.Provider value={dispatch}>
        {children}
      </TransferDispatchCOntext.Provider>
    </TransferStateContext.Provider>
  );
}

export function useTransferState() {
  return useContext(TransferStateContext);
}
export function useTransferDispatch() {
  return useContext(TransferDispatchCOntext);
}
