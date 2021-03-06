import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdAssignment, MdExitToApp, MdBook } from 'react-icons/md'

import { signOut } from '../../store/auth'
import { paths } from '../../helpers/routes/paths'

import c from './style.module.scss'

export type NavBarProps = {
  isInstructor: boolean
  isAdmin: boolean
}

export const NavBar: FC<NavBarProps> = ({ isInstructor, isAdmin }) => {
  const dispatch = useDispatch()

  const handleSignOut = () => {
    dispatch(signOut())
  }

  return (
    <div className={c.main}>
      <h1 className={c.brand}>
        Дистанционное
        <br />
        обучение
      </h1>
      <div className={c.linksWrapper}>
        <Link className={c.link} to={paths.COURSES}>
          <MdAssignment className={c.link__icon} />
          <span className={c.link__text}>Курсы</span>
        </Link>
        <Link className={c.link} to={paths.MY_COURSES}>
          <MdBook className={c.link__icon} />
          <span className={c.link__text}>Мои курсы</span>
        </Link>
        {isInstructor && (
          <section className={c.section}>
            <div className={c.sectionTitle}>Преподавателю</div>
            <Link className={c.link} to={paths.INSTRUCTOR_MANAGE_COURSES}>
              Управление курсами
            </Link>
          </section>
        )}
        {isAdmin && (
          <section className={c.section}>
            <div className={c.sectionTitle}>Администратору</div>
            <Link className={c.link} to={paths.ADMIN_CREATE_COURSE}>
              Создание курса
            </Link>
            <Link className={c.link} to={paths.ADMIN_ASSIGN_INSTRUCTOR_ROLE}>
              Назначение ролей
            </Link>
          </section>
        )}
        <button className={c.button} onClick={handleSignOut}>
          <MdExitToApp className={c.button__icon} />
          <span className={c.button__text}>Выйти</span>
        </button>
      </div>
    </div>
  )
}
