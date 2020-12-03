import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Logo } from '../../Logo/Logo'
import { HeaderForLoggedOut } from '../../Headers/HeaderForLoggedOut'
import { Footer } from '../../Footer/Footer'
import { ContentContainer } from '../Posts/ContentContainer'
import { About } from '../About/About'
import { ProfileContainer } from '../Profiles/ProfileContainer'
import { ProfileListContainer } from '../ProfileList/ProfileListContainer'

import '../../../styles/Main.css'
import { CourseShopItemContainer } from '../СourseShop/CourseShopItemContainer'

export const MainPageForLoggedOut = () => {
    return (
        <div className="main">
            <Logo />
            <HeaderForLoggedOut />
            <Switch>
                <Route exact path='/' component={ContentContainer} />
                <Route exact path='/about' component={About} />
                <Route exact path='/profiles' component={ProfileListContainer} />
                <Route path='/profiles/:id' component={ProfileContainer} />
                <Route path='/courses/:id' component={CourseShopItemContainer} />
                <Redirect to='/' />
            </Switch>
            <Footer />
        </div>
    )
}
