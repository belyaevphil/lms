import { Story, Meta } from '@storybook/react/types-6-0'
import { BrowserRouter } from 'react-router-dom'

import { HeaderForStories } from '../../components/Header/HeaderForStories'
import { NavBarForStories } from '../../components/NavBar/NavBarForStories'
import { CoursesForStories, CoursesForStoriesProps } from './CoursesForStories'

export default {
  title: 'Pages/Courses',
  component: CoursesForStories
} as Meta

const Template: Story<CoursesForStoriesProps> = args => (
  <BrowserRouter>
    <div
      style={{
        display: 'flex'
      }}
    >
      <NavBarForStories isInstructor={false} isAdmin={false} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <HeaderForStories userFirstName={'Имя'} userLastName={'Фамилия'} />
        <div
          style={{
            padding: '20px'
          }}
        >
          <CoursesForStories {...args} />
        </div>
      </div>
    </div>
  </BrowserRouter>
)

export const Primary = Template.bind({})
Primary.args = {
  courses: [
    {
      id: 1,
      name: 'Подготовка к ЕГЭ по математике',
      description:
        'Длинное описание для карточки, Длинное описание для карточки, Длинное описание для карточки, Длинное описание для карточки',
      completeness: 35
    },
    {
      id: 2,
      name: 'Подготовка к ЕГЭ по русскому языку',
      description:
        'Длинное описание для карточки, Длинное описание для карточки, Длинное описание для карточки, Длинное описание для карточки',
      completeness: 67
    }
  ]
}
