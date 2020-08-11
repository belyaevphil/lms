import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { ChangePassword } from '../../Authentication/ChangePassword'
import { MainPageForLoggedInModerator } from './MainPageForLoggedInModerator'

export const LoggedInModerator = ({ logoutHandler }) => {
    return (
        <Switch>
            <Route exact path='/changepassword' component={ChangePassword} />
            <Route path='/' render={(props) => <MainPageForLoggedInModerator {...props} logoutHandler={logoutHandler} />} />
        </Switch>
    )
}
