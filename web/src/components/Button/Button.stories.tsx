import { Story, Meta } from '@storybook/react/types-6-0'

import { Button, ButtonProps } from './index'

export default {
  title: 'Components/Button',
  component: Button
} as Meta

const Template: Story<ButtonProps> = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'Im a primary button'
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Im a secondary button',
  style: { backgroundColor: 'red' }
}
