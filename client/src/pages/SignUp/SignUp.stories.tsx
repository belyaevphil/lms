import { Story, Meta } from '@storybook/react/types-6-0'
import { BrowserRouter } from 'react-router-dom'

import { SignUpForStories } from './SignUpForStories'

import '../../commonStyles/index.scss'

export default {
  title: 'Pages/SignUp',
  component: SignUpForStories
} as Meta

const Template: Story = args => (
  <BrowserRouter>
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <SignUpForStories {...args} />
    </div>
  </BrowserRouter>
)

export const Default = Template.bind({})
