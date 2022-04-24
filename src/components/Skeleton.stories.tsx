import { Skeleton } from './Skeleton';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled/macro';
export default {
  title: 'UI/Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

const ExampleCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 50px;
  column-gap: 50px;
  width: 50%;
`;
const ExampleStyledCard = styled.div`
  display: flex;
  width: 250px;
  border-radius: 8px;
  height: 300px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  flex-direction: column;
`;

const ExampleCardHeader = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 15px;
`;

const ExampleCardImage = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 0 15px;
`;

const ExampleCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  gap: 10px;
`;

export const ExampleCard: ComponentStory<typeof Skeleton> = () => {
  return (
    <ExampleCardContainer>
      {[...Array(9)].map(() => {
        return (
          <ExampleStyledCard>
            <ExampleCardHeader>
              <Skeleton circle={true} width={40} height={40} />
              <Skeleton rounded={true} width={100} height={20} />
            </ExampleCardHeader>
            <ExampleCardImage>
              <Skeleton width={250} height={150} />
            </ExampleCardImage>
            <ExampleCardContent>
              <Skeleton width={200} height={20} />
              <Skeleton width={150} height={20} />
            </ExampleCardContent>
          </ExampleStyledCard>
        );
      })}
    </ExampleCardContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  width: 500,
  height: 20,
  unit: 'px',
  circle: false,
  rounded: true,
  color: '#e9e9e9',
  animation: true,
};
