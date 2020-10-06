import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { Register } from '../../Authentication/Register'
import { Login } from '../../Authentication/Login'
import { ForgotPassword } from '../../Authentication/ForgotPassword'
import { RestorePassword } from '../../Authentication/RestorePassword'
import { ActivateAccount } from '../../Authentication/ActivateAccount'
import { MainPageForLoggedOut } from './MainPageForLoggedOut'

export const LoggedOut = ({ loginHandler }) => {
    return (
        <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' render={(props) => <Login {...props} loginHandler={loginHandler} />} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <Route path='/restorepassword/:token' component={RestorePassword} />
            <Route path='/activateaccount/:token' component={ActivateAccount} />
            <Route path='/' component={MainPageForLoggedOut} />
        </Switch >
    )
}
