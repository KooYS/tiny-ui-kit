import { ComponentStory, ComponentMeta } from '@storybook/react';
import Carousel from './Carousel';
export default {
  title: 'UI/Carousel',
  component: Carousel,
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => {
  return <Carousel {...args} />;
};

const images = [
  'https://dummyimage.com/600x400/000000/fff.jpg',
  'https://dummyimage.com/600x400/ff00ff/fff.jpg',
  'https://dummyimage.com/600x400/cdcdcd/fff.jpg',
  'https://dummyimage.com/600x400/ff0000/fff.jpg',
];

export const Default = Template.bind({});
Default.args = {
  realIndex: (index) => {
    console.log(index);
  },
  images: images,
};
