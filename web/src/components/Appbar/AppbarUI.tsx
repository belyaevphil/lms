import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import * as MdIcons from 'react-icons/md'
import styled, { css } from 'styled-components'

import { Protected } from 'router'
import { Box } from 'components'
import { Typography } from 'components/Typography'
import { User } from 'types'
import { down } from 'theme/Themes'
import { Thunk } from 'store'

type NavbarProps = {
  styling: {
    open?: boolean
  }
}

const navbarWidth = '280px'

const Navbar = styled.nav<NavbarProps>`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  flex-shrink: 0;
  width: ${navbarWidth};
  height: 100%;
  position: fixed;
  overflow-y: auto;
  ${down('1280px')} {
    width: 0px;
    ${props =>
      props.styling.open &&
      css`
        width: ${navbarWidth};
        z-index: 1;
      `}
  }
  border-right: 1px solid #e8e8e8;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 64px;
  color: ${props => props.theme.palette.text.primary};
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
`

const LinksWrapper = styled.div`
  width: 100%;
  margin-top: 12px;
`

const NavButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  color: ${props => props.theme.palette.text.primary};
  padding: 12px 16px;
  position: relative;
  background-color: inherit;

  &:hover,
  &.active {
    color: ${props => props.theme.palette.primary.main};
  }
`

const NavButtonIcon = styled.div`
  width: 20px;
  height: 20px;
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  height: 64px;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 16px;
  width: calc(100% - ${navbarWidth});
  margin-left: ${navbarWidth};
  ${down('1280px')} {
    width: 100%;
    margin-left: 0px;
  }
`

const HeaderIcon = styled.span`
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: ${props => props.theme.palette.text.primary};
`

const FullName = styled.span`
  margin-left: 24px;
  color: ${props => props.theme.palette.text.primary};

  ${down('1280px')} {
    display: none;
  }
`

const MenuButton = styled.span`
  visibility: hidden;
  width: 20px;
  height: 20px;

  ${down('1280px')} {
    visibility: visible;
  }
`

const Content = styled.main`
  padding: 84px 0px 20px;
  width: calc(100% - ${navbarWidth});
  margin-left: ${navbarWidth};
  ${down('1280px')} {
    width: 100%;
    margin-left: 0px;
  }
`

export const navLinks = [
  {
    path: '/courses',
    text: 'Курсы',
    icon: MdIcons.MdBook,
    roles: ['STUDENT']
  },
  {
    path: '/instructor/courses/management',
    text: 'Управление курсами',
    icon: MdIcons.MdAssistant,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/instructor/lessons/assessment',
    text: 'Проверка заданий',
    icon: MdIcons.MdAssistant,
    roles: ['INSTRUCTOR']
  },
  {
    path: '/admin/management',
    text: 'Администратору',
    icon: MdIcons.MdLock,
    roles: ['ADMIN']
  }
]

export type AppbarUIProps = {
  userData: User | null
  signOutRequest: () => Thunk<Promise<void>>
}

export const AppbarUI: React.FunctionComponent<AppbarUIProps> = ({
  userData,
  signOutRequest,
  children
}) => {
  const isMobile = window.innerWidth < 1280
  const [open, setOpen] = React.useState(isMobile ? false : true)
  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <>
      <Navbar styling={{ open }}>
        <Logo>ДО при БФ БГУ</Logo>
        <LinksWrapper onClick={handleDrawerClose}>
          {navLinks.map(navLink => {
            return (
              <Protected key={navLink.path} userRoles={userData!.roles} roles={navLink.roles}>
                <NavButton as={RouterLink} to={navLink.path}>
                  {navLink.icon && <NavButtonIcon as={navLink.icon} />}
                  <Typography color={'inherit'} margin={'0 0 0 16px'}>
                    {navLink.text}
                  </Typography>
                </NavButton>
              </Protected>
            )
          })}
          <NavButton onClick={signOutRequest}>
            <NavButtonIcon as={MdIcons.MdExitToApp} />
            <Typography color={'inherit'} margin={'0 0 0 16px'}>
              Выйти
            </Typography>
          </NavButton>
        </LinksWrapper>
      </Navbar>
      <Header>
        <MenuButton>
          <HeaderIcon as={MdIcons.MdMenu} onClick={handleDrawerOpen} />
        </MenuButton>
        <Box
          styling={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FullName>{userData!.username}</FullName>
        </Box>
      </Header>
      <Content>{children}</Content>
    </>
  )
}
