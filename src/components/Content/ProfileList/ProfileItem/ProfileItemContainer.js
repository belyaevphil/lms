import React from 'react'

import { Link } from 'react-router-dom'

import './ProfileItem.css'

export const ProfileItemContainer = ({ imgSrc, surname, name, patronymic, profileSrc }) => {
    return (
        <article className="profileItem-wrapper">
            <div className="profileItem">
                <div className="profileItem-image">
                    <Link to={profileSrc} >{<img src={imgSrc} alt="defaultuserpic" />}</Link>
                </div>
                <div className="ProfileItem_data-wrapper">
                    <div className="ProfileItem-SNP">
                        <span className="profileItem-span">
                            <Link className="profile-link" to={profileSrc} >{surname} {name} {patronymic}</Link>
                        </span>
                    </div>
                    <span className="profileItem-a">
                        <Link className="profile-link" to={profileSrc} >посетить профиль &rarr;</Link>
                    </span>
                </div>
            </div>
        </article>
    )
}