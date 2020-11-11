import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import './FormsStyle.css'

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }

        this.loginHandler = this.loginHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async loginHandler() {
        try {
            const body = JSON.stringify({ ...this.state })
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            this.props.loginHandler(data.role)
            window.location.reload()
        } catch (e) {
            toast.error(e.message)
        }
    }

    render() {
        const { email, password } = this.state

        return (
            <div>
                <div className="user-identification">
                    <div className="user-identification-wrapper">
                        <label>Вход в систему</label>
                        <input
                            type="email"
                            placeholder="E-mail адрес"
                            name="email"
                            value={email}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.changeHandler}
                        />
                        <button onClick={this.loginHandler} >Войти</button>
                        <NavLink to='/register' className="hyperlink" >Ещё нет аккаунта?</NavLink>
                        <div className="hr"></div>
                        <NavLink to='/forgotpassword' className="hyperlink" >Забыли пароль?</NavLink>
                        <br />
                        <NavLink to='/' className="hyperlink" >Вернуться на главную</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
