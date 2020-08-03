import React from 'react'
import './Profile.css'

export const Profile = ({ data }) => {
    const { avatar, lastname, firstname, patronymic, email, phonenumber, about } = data

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
                                {lastname}
                            </span>
                            <b className="NSP">
                                Имя:
                        </b>
                            <span className="NSP">
                                {firstname}
                            </span>
                            {patronymic &&
                                <>
                                    <b className="NSP">
                                        Отчество:
                                </b>
                                    <span className="NSP">
                                        {patronymic}
                                    </span>
                                </>
                            }
                            <b className="NSP">
                                Email:
                            </b>
                            <span className="NSP">
                                <a href={`mailto:${email}`}>{email}</a>
                            </span>
                            {phonenumber &&
                                <>
                                    <b className="NSP">
                                        Номер телефона:
                                    </b>
                                    <span className="NSP">
                                        <a href={`tel:${phonenumber}`}>{phonenumber}</a>
                                    </span>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="profile_aboutMe">
                    <b className="NSP">Обо мне:</b>
                    <br />
                    <div className="aboutMe_text">
                        <p>
                            {about}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}