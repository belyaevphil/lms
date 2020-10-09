import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { Logo } from '../../Logo/Logo'
import { Footer } from '../../Footer/Footer'
import { HeaderForModerator } from '../../Headers/HeaderForModerator'
import { ContentContainer } from '../Posts/ContentContainer'
import { About } from '../About/About'
import { ProfileContainer } from '../Profiles/ProfileContainer'
import { ProfileListContainer } from '../ProfileList/ProfileListContainer'
import { MyProfileContainer } from '../Profiles/MyProfileContainer'
import { Moderation } from './Moderation'
import { CourseShopContainer } from '../СourseShop/CourseShopContainer'
import { CourseShopItemContainer } from '../СourseShop/CourseShopItemContainer'
import { MyCourses } from '../MyCourses/MyCourses'
import { PaymentEnd } from '../PaymentEnd/PaymentEnd'

import '../../../styles/Main.css'

export const MainPageForLoggedInModerator = ({ logoutHandler }) => {
    return (
        <div className="main">
            <Logo />
            <HeaderForModerator logoutHandler={logoutHandler} />
            <Switch>
                <Route exact path='/' component={ContentContainer} />
                <Route exact path='/about' component={About} />
                <Route exact path='/paymentend' component={PaymentEnd} />
                <Route exact path='/profiles' component={ProfileListContainer} />
                <Route exact path='/profile' component={MyProfileContainer} />
                <Route exact path='/courseshop' component={CourseShopContainer} />
                <Route path='/courses/:id' component={CourseShopItemContainer} />
                <Route exact path='/mycourses' component={MyCourses} />
                <Route path='/profiles/:id' component={ProfileContainer} />
                <Route path='/moderation' component={Moderation} />
                <Redirect to='/' />
            </Switch>
            <Footer />
        </div>
    )
}
