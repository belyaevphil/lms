import { Story, Meta } from '@storybook/react/types-6-0'

import { HeaderForStories, HeaderForStoriesProps } from './HeaderForStories'

export default {
  title: 'Components/Header',
  component: HeaderForStories
} as Meta

const Template: Story<HeaderForStoriesProps> = args => <HeaderForStories {...args} />

export const Primary = Template.bind({})
Primary.args = {
  userFirstName: 'Имя',
  userLastName: 'Фамилия'
}
