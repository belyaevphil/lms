import React from 'react'

import { ArticleContainer } from './Article/ArticleContainer'
import { PaginationContainer } from '../Pagination/PaginationContainer'
import defaultImage from '../../../images/profile.jpg'

import './Content.css'

export const Content = ({ pagination, currentPageHandler }) => {
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
        <div className="wrapper">
            <div className="content">
                {items.map(item => (
                    <ArticleContainer key={item.id}
                        title={item.header}
                        date={`Дата создания: ${new Date(item.creation_date).toLocaleDateString()}`}
                        imgSrc={item.image ? `http://localhost:5000/${item.image}` : defaultImage}
                        category={`Категория: ${item.category_name}`}
                        text={item.content}
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