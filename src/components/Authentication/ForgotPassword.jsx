import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import './FormsStyle.css'

export class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ''
        }

        this.forgotPasswordHandler = this.forgotPasswordHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async forgotPasswordHandler() {
        try {
            const body = JSON.stringify({ ...this.state })
            const response = await fetch('http://localhost:5000/api/users/forgotpassword', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            this.props.history.push('/login')
            toast.success(data.message)
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
                        <input type="email" placeholder="E-mail адрес" name="email" value={this.state.email} onChange={this.changeHandler} />
                        <button onClick={this.forgotPasswordHandler} >Отправить письмо</button>
                        <br />
                        <NavLink className="hyperlink" to='/' >Вернуться на главную</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
