import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'UI/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;
const Template: ComponentStory<typeof Pagination> = (args) => {
  return <Pagination {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  count: 100,
  hidePrevButton: false,
  hideNextButton: false,
  defaultPage: 1,
  siblingCount: 2,
  boundaryCount: 2,
};
