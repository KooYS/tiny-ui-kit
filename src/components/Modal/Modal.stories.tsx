import styled from '@emotion/styled/macro';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import { MdClose } from 'react-icons/md';

export default {
  title: 'UI/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const ModalBody = styled.div`
  position: relative;
  & h2 {
    margin: 10px 0;
  }
  & div {
    margin: 30px 0;
  }
`;
const Button = styled.button`
  border: 0;
  background: #000000;
  color: white;
  padding: 15px 50px;
  border-radius: 8px;
`;

const ModalClose = styled.button`
  border: 0;
  background: transparent;
  font-size: 25px;
  position: absolute;
  right: 0;
  margin: 0;
  padding: 0;
  top: 0;
  cursor: pointer;
`;
const Template: ComponentStory<typeof Modal> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Open</Button>
      <Modal {...args} isOpen={isOpen} onClose={handleClose}>
        <ModalBody>
          <h2>Hello</h2>
          <div>Tiny-ui-kit</div>
          <ModalClose onClick={handleClose}>
            <MdClose />
          </ModalClose>
        </ModalBody>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {};
