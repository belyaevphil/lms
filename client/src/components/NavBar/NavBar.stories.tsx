import { Story, Meta } from '@storybook/react/types-6-0'
import { BrowserRouter } from 'react-router-dom'

import { NavBarForStories, NavBarForStoriesProps } from './NavBarForStories'

export default {
  title: 'Components/NavBar',
  component: NavBarForStories
} as Meta

const Template: Story<NavBarForStoriesProps> = args => (
  <BrowserRouter>
    <NavBarForStories {...args} />
  </BrowserRouter>
)

export const Primary = Template.bind({})
Primary.args = {
  isAdmin: false,
  isInstructor: false
}

export const Admin = Template.bind({})
Admin.args = {
  isAdmin: true,
  isInstructor: false
}

export const Instructor = Template.bind({})
Instructor.args = {
  isAdmin: false,
  isInstructor: true
}
