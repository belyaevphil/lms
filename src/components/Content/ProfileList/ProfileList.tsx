import React from 'react'

import { ProfileItemContainer } from './ProfileItem/ProfileItemContainer'
import { PaginationContainer } from '../Pagination/PaginationContainer'
import SearchBlockContainer from './SearchBlock/SearchBlockContainer'
import defaultImage from '../../../images/defaultavatar.webp'

import './ProfileList.css'

export const ProfileList = ({ pagination, currentPageHandler }) => {
    const { error, isLoaded, items } = pagination

    if (error) {
        return <div className="wrapper">
            <span className="content-error">Произошла ошибка на сервере, пожалуйста повторите еще раз</span>
        </div>
    } else if (!isLoaded) {
        return <div className="wrapper">
            <span className="content-loading">Загрузка...</span>
        </div>
    }

    return (
        <div id="wrapper">
            <div id="content">
                <SearchBlockContainer />
                {items.map(item => (
                    <ProfileItemContainer key={item.id}
                        imgSrc={item.avatar || defaultImage}
                        surname={item.lastname}
                        name={item.firstname}
                        patronymic={item.patronymic || ''}
                        profileSrc={`/profiles/${item.id}`}
                    />
                ))}
                <PaginationContainer
                    pagination={pagination}
                    currentPageHandler={currentPageHandler}
                />
            </div>
        </div>
    )
}