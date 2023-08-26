import React, { FC } from 'react';
import ReactDOM from "react-dom";
import { useEffect } from "react";
import modal from './modal.module.css'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ModalProps } from '../../services/types/data';


const modalRoot: HTMLElement | null = document.querySelector('#react-modals');

const Modal: FC<ModalProps> = ({ title, children, onClose }) => {
  useEffect(() => {
    const keyHandler = (evt: {key: string}) => {
      if (evt.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  }, [onClose]);

  return modalRoot && ReactDOM.createPortal(
    (<>
      <div className={`${ modal.container }`}>
        <div className={`${ modal.title_container} pt-15`}>
          {title &&
            <h2 className={`${ modal.title } text text_type_main-large`}>{title}</h2>
          }
          <button className={`${ modal.button }`} onClick={onClose}>
            <CloseIcon type = "primary"/>
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>),
    modalRoot
  );
}

export default React.memo(Modal);

