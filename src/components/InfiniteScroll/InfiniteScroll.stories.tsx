import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  InfiniteScrollUsingPackage,
  InfiniteScrollUsingScrollEvent,
  InfiniteScrollUsingIntersectionObserver,
} from './InfiniteScroll';

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
ReactInfiniteScroll.args = {};
export const ScrollEvent = InfiniteScrollUsingScrollEventTemplate.bind({});
ScrollEvent.args = {};
export const IntersectionObserver =
  InfiniteScrollUsingIntersectionObserverTemplate.bind({});
IntersectionObserver.args = {};
