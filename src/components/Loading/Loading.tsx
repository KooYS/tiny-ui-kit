import styled from '@emotion/styled/macro';
import React from 'react';

const Container = styled.div``;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.3;
  background: black;
`;
const Icon = styled.span`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
interface LoadingProps {
  icon?: React.ReactNode;
}
export const Loading: React.FC<LoadingProps> = ({ icon }) => {
  return (
    <Container>
      <Overlay></Overlay>
      <Icon>{icon}</Icon>
    </Container>
  );
};
