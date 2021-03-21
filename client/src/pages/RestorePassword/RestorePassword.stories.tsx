import { Story, Meta } from '@storybook/react/types-6-0'
import { BrowserRouter } from 'react-router-dom'

import { RestorePasswordForStories } from './RestorePasswordForStories'

import '../../commonStyles/index.scss'

export default {
  title: 'Pages/RestorePassword',
  component: RestorePasswordForStories
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
      <RestorePasswordForStories {...args} />
    </div>
  </BrowserRouter>
)

export const Default = Template.bind({})
