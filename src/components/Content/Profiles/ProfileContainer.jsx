import React, { Component } from 'react'
import { Profile } from './Profile'

import defaultAvatar from '../../../images/defaultavatar.webp'

export class ProfileContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            avatar: null,
            firstname: '',
            lastname: '',
            patronymic: '',
            email: '',
            phonenumber: '',
            about: '',
            error: null
        }

        this.fetchUser = this.fetchUser.bind(this)
    }

    async fetchUser() {
        try {
            const response = await fetch(`http://localhost:5000/api/users/profiles?id=${this.props.match.params.id}`, {
                credentials: 'include'
            })
            const data = await response.json()
            const { about, email, firstname, lastname, patronymic, phonenumber, avatar } = data
            this.setState({
                avatar: avatar || defaultAvatar,
                firstname,
                lastname,
                patronymic,
                email,
                phonenumber,
                about,
                error: null
            })
        } catch (e) {
            this.setState({
                avatar: null,
                firstname: '',
                lastname: '',
                patronymic: '',
                email: '',
                phoneNumber: '',
                about: '',
                error: e.message
            })
        }
    }

    componentDidMount() {
        this.fetchUser()
    }

    render() {
        return (
            <Profile data={this.state} />
        )
    }
}