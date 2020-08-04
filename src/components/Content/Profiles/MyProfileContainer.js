import React, { Component } from 'react'
import { toast } from 'react-toastify'

import defaultAvatar from '../../../images/defaultavatar.webp'
import { Link } from 'react-router-dom'

import './Profile.css'

export class MyProfileContainer extends Component {
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

        this.fetchMyProfile = this.fetchMyProfile.bind(this)
        this.updateProfileData = this.updateProfileData.bind(this)
    }

    about
    firstname
    lastname
    patronymic
    phonenumber
    avatar

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    async fetchMyProfile() {
        try {
            const response = await fetch('http://localhost:5000/api/users/myprofile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if (!response.ok) window.location.reload()
            const data = await response.json()
            const { about, email, firstname, lastname, patronymic, phonenumber, avatar } = data
            this.about = about
            this.email = email
            this.firstname = firstname
            this.lastname = lastname
            this.patronymic = patronymic
            this.phonenumber = phonenumber
            this.avatar = avatar
            this.setState({
                avatar: avatar || defaultAvatar,
                firstname,
                lastname,
                patronymic,
                email,
                phonenumber: phonenumber || '-',
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
                phonenumber: '',
                about: '',
                error: e.message
            })
        }
    }

    async updateProfileData() {
        const { about, firstname, lastname, patronymic, phonenumber, avatar } = this.state
        if (this.about === about && this.firstname === firstname &&
            this.lastname === lastname && this.patronymic === patronymic &&
            this.phonenumber === phonenumber && this.avatar === avatar) {
            toast.error('Сперва нужно изменить какие-либо данные')
        } else {
            try {
                const body = JSON.stringify({ about, firstname, lastname, patronymic, phonenumber, avatar })
                const response = await fetch('http://localhost:5000/api/users/updateinfo', {
                    method: 'PATCH',
                    body,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
                const data = await response.json()
                if (!response.ok) throw new Error(data.message)
                toast.success(data.message)
                this.fetchMyProfile()
            } catch (e) {
                toast.error(e.message)
            }
        }
    }

    componentDidMount() {
        this.fetchMyProfile()
    }

    render() {
        const { avatar, about, lastname, firstname, patronymic, phonenumber, email } = this.state

        return (
            <div className="wrapper-profile">
                <div className="profile">
                    <div className="main-info">
                        <div className="profile-image">
                            <img src={avatar} alt="imageProfile" />
                        </div>
                        <div className="profile-info">
                            <div className="profile-NSP">
                                <b className="NSP">
                                    Фамилия:
                                </b>
                                <span className="NSP">
                                    <input type="textbox" value={lastname} name="lastname" onChange={this.changeHandler} />
                                </span>
                                <b className="NSP">
                                    Имя:
                                </b>
                                <span className="NSP">
                                    <input type="textbox" value={firstname} name="firstname" onChange={this.changeHandler} />
                                </span>
                                <b className="NSP">
                                    Отчество:
                                </b>
                                <span className="NSP">
                                    <input type="textbox" value={patronymic} name="patronymic" onChange={this.changeHandler} />
                                </span>
                                <b className="NSP">
                                    Email:
                                </b>
                                <span className="NSP">
                                    <span type="textbox">{email}</span>
                                </span>
                                <b className="NSP">
                                    Номер телефона:
                                </b>
                                <span className="NSP">
                                    <input type="textbox" value={phonenumber} name="phonenumber" onChange={this.changeHandler} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="profile_aboutMe">
                        <b className="NSP">Обо мне:</b>
                        <br />
                        <div className="aboutMe_text">
                            <textarea value={about} name="about" onChange={this.changeHandler} ></textarea>
                        </div>
                    </div>
                    <div className="profile_buttons">
                        <button className="profile_button" onClick={this.updateProfileData} >Редактировать профиль</button>
                        <Link className="profile_button" to='/changepassword' >Изменить пароль</Link>
                    </div>
                </div>
            </div>
        )
    }
}