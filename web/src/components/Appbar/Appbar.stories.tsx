import { Story, Meta } from '@storybook/react/types-6-0'

import { AppbarUI, AppbarUIProps } from './AppbarUI'

export default {
  title: 'Components/Navbar',
  component: AppbarUI
} as Meta

const Template: Story<AppbarUIProps> = args => <AppbarUI {...args} />

export const Primary = Template.bind({})
Primary.args = {
  userData: {
    id: 1,
    roles: ['STUDENT'],
    username: 'heyy',
    firstName: 'Philip',
    lastName: 'Belyaev',
    email: null,
    phone: null
  }
}

export const Admin = Template.bind({})
Admin.args = {
  userData: {
    id: 1,
    roles: ['STUDENT', 'ADMIN'],
    username: 'heyy',
    firstName: 'Philip',
    lastName: 'Belyaev',
    email: null,
    phone: null
  }
}

export const Instructor = Template.bind({})
Instructor.args = {
  userData: {
    id: 1,
    roles: ['STUDENT', 'INSTRUCTOR'],
    username: 'heyy',
    firstName: 'Philip',
    lastName: 'Belyaev',
    email: null,
    phone: null
  }
}
