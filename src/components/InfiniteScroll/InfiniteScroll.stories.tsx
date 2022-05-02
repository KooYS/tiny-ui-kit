import { ComponentStory, ComponentMeta } from '@storybook/react';
import InfiniteScrollUsingPackage from './InfiniteScrollUsingPackage';
import InfiniteScrollUsingScrollEvent from './InfiniteScrollUsingScrollEvent';
import InfiniteScrollUsingIntersectionObserver from './InfiniteScrollUsingIntersectionObserver';

export default {
  title: 'UI/InfiniteScroll',
  components: [
    InfiniteScrollUsingPackage,
    InfiniteScrollUsingScrollEvent,
    InfiniteScrollUsingIntersectionObserver,
  ],
} as ComponentMeta<typeof InfiniteScrollUsingPackage>;

const InfiniteScrollUsingPackageTemplate: ComponentStory<
  typeof InfiniteScrollUsingPackage
> = (args) => {
  return <InfiniteScrollUsingPackage {...args} />;
};

const InfiniteScrollUsingScrollEventTemplate: ComponentStory<
  typeof InfiniteScrollUsingScrollEvent
> = (args) => {
  return <InfiniteScrollUsingScrollEvent {...args} />;
};

const InfiniteScrollUsingIntersectionObserverTemplate: ComponentStory<
  typeof InfiniteScrollUsingIntersectionObserver
> = (args) => {
  return <InfiniteScrollUsingIntersectionObserver {...args} />;
};

export const ReactInfiniteScroll = InfiniteScrollUsingPackageTemplate.bind({});
export const IntersectionObserver =
  InfiniteScrollUsingIntersectionObserverTemplate.bind({});
export const ScrollEvent = InfiniteScrollUsingScrollEventTemplate.bind({});
