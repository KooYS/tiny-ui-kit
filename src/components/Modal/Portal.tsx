import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  selector?: string;
  children?: React.ReactNode;
}
const Portal: React.FC<Props> = ({ children, selector = '#modal-root' }) => {
  const containerNode = selector && document.querySelector(selector);
  const portal = containerNode
    ? createPortal(children, containerNode)
    : children;

  console.log(
    document,
    document.querySelector(selector),
    document.getElementById(selector)
  );
  return <>{portal}</>;
};

export default Portal;
