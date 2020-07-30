import React, { Component } from 'react'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

import './FormsStyle.css'

export class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmationPassword: ''
        }

        this.changePasswordHandler = this.changePasswordHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async changePasswordHandler() {
        try {
            const body = JSON.stringify({ ...this.state })
            const response = await fetch(`http://localhost:5000/api/users/changepassword`, {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            toast.success(data.message)
            this.props.history.push('/profile')
        } catch (e) {
            toast.error(e.message)
        }
    }

    render() {
        return (
            <div>
                <div className="user-identification">
                    <div className="user-identification-wrapper">
                        <label>Изменение пароля</label>
                        <input type="password" placeholder="Новый пароль" name="password" value={this.state.password} onChange={this.changeHandler} />
                        <input type="password" placeholder="Подтверждающий пароль" name="confirmationPassword" value={this.state.confirmationPassword} onChange={this.changeHandler} />
                        <button onClick={this.changePasswordHandler} >Изменить</button>
                        <br />
                        <NavLink to='/profile' className="hyperlink" >Вернуться к профилю</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
