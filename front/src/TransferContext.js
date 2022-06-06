import React, { createContext, useContext, useReducer } from 'react';

const Image = {
  image_file: '',
  preview_URL: 'img/default_image.png',
  caption: '',
  blank: '',
  loaded: false,
  captioned: false,
  score: 0,
  hint: '',
};
function TransferReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loaded: 'loading',
      };
    case 'SAVE':
      return {
        ...state,
        image_file: action.imf,
        preview_URL: action.prv,
        loaded: true,
      };
    case 'DELETE':
      return {
        ...state,
        image_file: '',
        preview_URL: 'img/default_image.png',
        loaded: false,
      };
    // 파일 전송 시퀸스에 맞게 수정필요함.
    case 'RESULTSET':
      return {
        ...state,
        caption: action.caption,
        blank: action.blank,
        loaded: true,
        captioned: true,
        hint: action.hint,
        score: 0,
      };
    case 'SCORESET':
      return {
        ...state,
        score: action.score,
      };
    case 'HINTSET':
      return {
        ...state,
        hint: action.hint,
        score: 0,
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
