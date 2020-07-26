import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

import './Header.css'
import './HeaderMenu.css'

export class HeaderForModerator extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.logoutHandler = this.logoutHandler.bind(this)
    }

    async logoutHandler() {
        try {
            await fetch('http://localhost:5000/api/users/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            this.props.logoutHandler()
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        const main = <div className="main-info">
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/' >Главная</NavLink>
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/about' >О нас</NavLink>
        </div>

        const user = <div className="user">
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/profile' >Профиль</NavLink>
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/profiles' >Участники</NavLink>
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/courseshop' >Магазин курсов</NavLink>
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/mycourses' >Мои курсы</NavLink>
            <NavLink exact={true} activeClassName="header-button-active" className="header-button" to='/moderation' >Панель управления</NavLink>
            <Link to="/" onClick={this.logoutHandler} className="header-button">Выход</Link>
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
        } else {
            return (
                <div className="mobile-menu">
                    <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
                    <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon"></div></label>
                    <div className="mobile-menu__container">
                        <ul className="mobile-menu__list">
                            <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/' >Главная</NavLink></li>
                            <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/about' >О нас</NavLink></li>
                            <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/profile' >Профиль</NavLink></li>
                            <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/profiles' >Участники</NavLink></li>
                            <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/courseshop' >Магазин курсов</NavLink></li>
                            <li className="mobile-menu__item"><NavLink onClick={closeMobileMenu} exact={true} activeClassName="mobile-menu__item-active" className="mobile-menu__link" to='/mycourses' >Мои курсы</NavLink></li>
                            <li className="mobile-menu__item"><Link exact={true} onClick={this.logoutHandler} className="mobile-menu__link" to='/' >Выход</Link></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}