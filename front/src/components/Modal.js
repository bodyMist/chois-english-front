import React from 'react';
import './modal.css';
const Modal = (props) => {
  const { open, close, closeYes, closeNo, header } = props;
  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className="close" onClick={closeYes}>
              예
            </button>
            <button className="close" onClick={closeNo}>
              아니오
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Modal;
