import React from 'react'
import { Switch, Route } from 'react-router-dom'


import { ChangePassword } from '../../Authentication/ChangePassword'
import { MainPageForLoggedInUser } from './MainPageForLoggedInUser'

export const LoggedInUser = ({ logoutHandler }) => {
    return (
        <Switch>
            <Route exact path='/changepassword' component={ChangePassword} />
            <Route path='/' render={(props) => <MainPageForLoggedInUser {...props} logoutHandler={logoutHandler} />} />
        </Switch>
    )
}
