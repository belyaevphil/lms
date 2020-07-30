import React, { Component } from 'react'
import { toast } from 'react-toastify'

import './FormsStyle.css'

export class RestorePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmationPassword: '',
            restorationToken: ''
        }

        this.restorePasswordHandler = this.restorePasswordHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async restorePasswordHandler() {
        try {
            const body = JSON.stringify({ ...this.state, restorationToken: this.props.match.params.token })
            const response = await fetch(`http://localhost:5000/api/users/restorepassword`, {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            toast.success(data.message)
            setTimeout(window.close, 5000)
        } catch (e) {
            toast.error(e.message)
        }
    }

    render() {
        return (
            <div>
                <div className="user-identification">
                    <div className="user-identification-wrapper">
                        <label>Восстановление пароля</label>
                        <input type="password" placeholder="Новый пароль" name="password" value={this.state.password} onChange={this.changeHandler} />
                        <input type="password" placeholder="Подтверждающий пароль" name="confirmationPassword" value={this.state.confirmationPassword} onChange={this.changeHandler} />
                        <button onClick={this.restorePasswordHandler} >Восстановить</button>
                    </div>
                </div>
            </div>
        )
    }
}
