import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from './Pagination';

export default {
  title: 'UI/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;
const Template: ComponentStory<typeof Pagination> = (args) => {
  const [page, setPage] = useState(1);
  const handleChange = async (value: number) => {
    setPage(value);
  };
  return (
    <>
      page : {page}
      <Pagination
        {...args}
        page={page}
        onChange={(value) => handleChange(value)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  count: 20,
  hidePrevButton: false,
  hideNextButton: false,
  defaultPage: 1,
  siblingCount: 2,
  boundaryCount: 4,
};
