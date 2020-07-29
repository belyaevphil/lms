import React, { Component } from 'react'
import { toast } from 'react-toastify'

import './FormsStyle.css'

export class ActivateAccount extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.activateHandler = this.activateHandler.bind(this)
    }

    async activateHandler() {
        try {
            const body = JSON.stringify({ activationToken: this.props.match.params.token })
            const response = await fetch('http://localhost:5000/api/users/activate', {
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
                        <label>Активация аккаунта</label>
                        <button onClick={this.activateHandler} >Активировать</button>
                    </div>
                </div>
            </div>
        )
    }
}
