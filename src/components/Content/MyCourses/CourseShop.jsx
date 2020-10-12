import React from 'react'

import { ShopItemContainer } from './ShopItem/ShopItemContainer'
import SearchBlockContainer from './SearchBlock/SearchBlockContainer'
import { PaginationContainer } from '../Pagination/PaginationContainer'

import './CourseShop.css'

export const CourseShop = ({ pagination, currentPageHandler }) => {
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
                    <ShopItemContainer key={item.idDrink}
                        name={item.name}
                        price={5000}
                        detailSrc={'https://google.com'}
                    />
                ))}
                {items.length > 5 && <PaginationContainer
                    pagination={pagination}
                    currentPageHandler={currentPageHandler}
                />}
            </div>
        </div>
    )
}