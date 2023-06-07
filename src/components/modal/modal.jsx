import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import modal from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";


const modalRoot = document.querySelector('#react-modals');

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const keyHandler = (evt) => {
      if (evt.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  }, [onClose]);

  return ReactDOM.createPortal(
    (<>
      <div className={`${ modal.container }`}>
        <div className={`${ modal.title_container} pt-15`}>
          {title &&
            <h2 className={`${ modal.title } text text_type_main-large`}>{title}</h2>
          }
          <button className={`${ modal.button }`} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>),
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default React.memo(Modal);

