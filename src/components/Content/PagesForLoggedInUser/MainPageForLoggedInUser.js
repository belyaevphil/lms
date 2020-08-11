import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Logo } from '../../Logo/Logo'
import { Footer } from '../../Footer/Footer'
import { HeaderForUser } from '../../Headers/HeaderForUser'
import { ContentContainer } from '../Posts/ContentContainer'
import { About } from '../About/About'
import { ProfileContainer } from '../Profiles/ProfileContainer'
import { ProfileListContainer } from '../ProfileList/ProfileListContainer'
import { MyProfileContainer } from '../Profiles/MyProfileContainer'
import { MyCourses } from '../MyCourses/MyCourses'
import { CourseShopContainer } from '../СourseShop/CourseShopContainer'

import '../../../styles/Main.css'

export const MainPageForLoggedInUser = ({ logoutHandler }) => {
    return (
        <div className="main">
            <Logo />
            <HeaderForUser logoutHandler={logoutHandler} />
            <Switch>
                <Route exact path='/' component={ContentContainer} />
                <Route exact path='/about' component={About} />
                <Route exact path='/profiles' component={ProfileListContainer} />
                <Route exact path='/profile' component={MyProfileContainer} />
                <Route exact path='/courseshop' component={CourseShopContainer} />
                <Route exact path='/mycourses' component={MyCourses} />
                <Route path='/profiles/:id' component={ProfileContainer} />
                <Redirect to='/' />
            </Switch>
            <Footer />
        </div>
    )
}
