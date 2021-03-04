import { Story, Meta } from '@storybook/react/types-6-0'

import { Loader } from '.'

export default {
  title: 'Components/Loader',
  component: Loader
} as Meta

const Template: Story = args => <Loader {...args} />

export const Default = Template.bind({})
