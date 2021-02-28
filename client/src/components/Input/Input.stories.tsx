import { Story, Meta } from '@storybook/react/types-6-0'

import { Input, InputProps } from '.'

export default {
  title: 'Components/Input',
  component: Input
} as Meta

const Template: Story<InputProps> = args => <Input {...args} />

export const Primary = Template.bind({})

export const Success = Template.bind({})
Success.args = {
  value: 'Поле с корректными данными'
}

export const Error = Template.bind({})
Error.args = {
  error: 'Поле ввода с ошибкой'
}
