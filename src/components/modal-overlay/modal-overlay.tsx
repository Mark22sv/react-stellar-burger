import React, { FC } from 'react';
import modalOverlay from "./modal-overlay.module.css";
import { ModalOverlayProps } from '../../services/types/data';

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose }) => {
  return (
  <div className={modalOverlay.overlay} onClick={onClose}></div>
  );
};

export default React.memo(ModalOverlay);
