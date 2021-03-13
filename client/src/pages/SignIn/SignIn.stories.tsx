import { Story, Meta } from '@storybook/react/types-6-0'
import { BrowserRouter } from 'react-router-dom'

import { SignInForStories } from './SignInForStories'

import '../../commonStyles/index.scss'

export default {
  title: 'Pages/SignIn',
  component: SignInForStories
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
      <SignInForStories {...args} />
    </div>
  </BrowserRouter>
)

export const Default = Template.bind({})
