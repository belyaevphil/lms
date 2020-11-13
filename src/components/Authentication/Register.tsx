import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import './FormsStyle.css'

export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastname: '',
            patronymic: '',
            email: '',
            password: '',
            confirmationPassword: ''
        }

        this.registerHandler = this.registerHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async registerHandler() {
        try {
            const body = JSON.stringify({ ...this.state })
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
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
                        <label>Регистрация</label>
                        <input
                            type="text"
                            placeholder="Имя"
                            name="firstname"
                            value={this.state.firstName}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="text"
                            placeholder="Фамилия"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="text"
                            placeholder="Отчество (при наличии)"
                            name="patronymic"
                            value={this.state.patronymic}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="email"
                            placeholder="E-mail адрес"
                            name="email"
                            value={this.state.email}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                        />
                        <input
                            type="password"
                            placeholder="Подтверждающий пароль"
                            name="confirmationPassword"
                            value={this.state.confirmationPassword}
                            onChange={this.changeHandler}
                        />
                        <button onClick={this.registerHandler} >Зарегистрироваться</button>
                        <NavLink to='/login' className="hyperlink" >Уже есть аккаунт?</NavLink>
                        <br />
                        <NavLink to='/' className="hyperlink" >Вернуться на главную</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
