import React from 'react'
import { NavLink } from 'react-router-dom'

import './ModerationMenu.css'

export class ModerationMenuContainer extends React.Component {
    render() {
        if (document.getElementById('root').offsetWidth > 1049) {
            return (
                <div className="moderationMenu-wrapper">
                    <div className="moderationMenu">
                        <div className="moderationMenu_navigation">
                            <NavLink exact={true} activeClassName="navigation-item-current" className="navigation-item" to="/moderation/createpost">Создать пост</NavLink>
                            <NavLink exact={true} activeClassName="navigation-item-current" className="navigation-item" to="/moderation/createcategory">Создать категорию</NavLink>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="mobile-menu">
                    <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
                    <label for="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon"></div></label>
                    <div className="mobile-menu__container">
                        <ul className="mobile-menu__list">
                            <li className="mobile-menu__item"><NavLink exact={true} to="/moderation/createpost" className="mobile-menu__link">Создать пост</NavLink></li>
                            <li className="mobile-menu__item"><NavLink exact={true} to="/moderation/createcategory" className="mobile-menu__link">Создать категорию</NavLink></li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}