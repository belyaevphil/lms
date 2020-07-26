import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.css'
import './HeaderMenu.css'

export const HeaderForLoggedOut = () => {
    const main = <div className="main-info">
        <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/' >Главная</NavLink>
        <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/about' >О нас</NavLink>
    </div>

    const user = <div className="user">
        <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/profiles' >Участники</NavLink>
        <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/login' >Войти</NavLink>
    </div>

    const closeMobileMenu = () => {
        document.getElementById("checkbox").checked = false;
    }

    if (document.getElementById('root').offsetWidth > 1049) {
        return (
            <div id="header">
                <nav className="header-wrapper">
                    {main}
                    {user}
                </nav>
            </div>
        )
    }
    else {
        return (
            <div className="mobile-menu">
                <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
                <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon"></div></label>
                <div className="mobile-menu__container">
                    <ul className="mobile-menu__list">
                        <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/' >Главная</NavLink></li>
                        <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/about' >О нас</NavLink></li>
                        <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/profiles' >Участники</NavLink></li>
                        <li className="mobile-menu__item"><NavLink exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/login' >Войти</NavLink></li>
                    </ul>
                </div>
            </div>
        )
    }
}