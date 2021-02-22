import { Story, Meta } from '@storybook/react/types-6-0'

import { FileUploader, FileUploaderProps } from '.'

export default {
  title: 'Components/FileUploader',
  component: FileUploader
} as Meta

const Template: Story<FileUploaderProps> = args => <FileUploader {...args} />

export const Primary = Template.bind({})
