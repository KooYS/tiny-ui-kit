import React from 'react';
import styled from '@emotion/styled/macro';
import Portal from './Portal';
import CSSTransition from 'react-transition-group/CSSTransition';
import './modal.css';

interface Props {
  selector?: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  background: black;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
`;

const ModalContainer = styled.div`
  border-radius: 15px;
  background: white;
  z-index: 1;
  max-width: 400px;
  width: 100%;
  padding: 15px;
`;
const Modal: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  selector = '#modal-root',
}) => {
  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <Portal selector={selector}>
        <Overlay>
          <Background onClick={onClose}></Background>
          <ModalContainer>{children}</ModalContainer>
        </Overlay>
      </Portal>
    </CSSTransition>
  );
};

export default Modal;
