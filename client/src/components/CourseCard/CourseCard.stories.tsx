import { Story, Meta } from '@storybook/react/types-6-0'

import { CourseCardForStories, CourseCardForStoriesProps } from './CourseCardForStories'

export default {
  title: 'Components/CourseCard',
  component: CourseCardForStories
} as Meta

const Template: Story<CourseCardForStoriesProps> = args => <CourseCardForStories {...args} />

export const Default = Template.bind({})
Default.args = {
  course: {
    id: 1,
    name: 'Математика',
    description: 'Описание',
    completeness: 16
  }
}
