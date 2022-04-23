import { Skeleton } from './Skeleton';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'UI/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Card = Template.bind({});
Card.args = {
  width: 200,
  height: 50,
  unit: 'px',
  circle: false,
  rounded: true,
  color: '#e9e9e9',
  animation: true,
};
