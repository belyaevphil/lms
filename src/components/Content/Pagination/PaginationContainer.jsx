import React from 'react'

import './Pagination.css'

export const PaginationContainer = ({ pagination, currentPageHandler }) => {
    const { totalCount, currentPage } = pagination
    const pagesCount = Math.ceil(totalCount / 5)

    const goToStart = () => { currentPageHandler(1) }
    const goToPrev = () => { if (currentPage > 1) currentPageHandler(currentPage - 1) }
    const goToNext = () => { if (currentPage < pagesCount) currentPageHandler(currentPage + 1) }
    const goToEnd = () => { currentPageHandler(pagesCount) }

    return (
        <div className="pagination-wrapper">
            <div className="pagination">
                <span className="not-current-page" onClick={goToStart}>В начало</span>
                <span className="not-current-page" onClick={goToPrev}>&lt;</span>
                <span className="current-page" >{currentPage}</span>
                <span className="not-current-page" onClick={goToNext}>&gt;</span>
                <span className="not-current-page" onClick={goToEnd}>В конец</span>
            </div>
        </div>
    )
}