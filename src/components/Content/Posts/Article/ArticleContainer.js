import React from 'react'

import './Article.css'

export const ArticleContainer = ({ title, date, imgSrc, category, text }) => {
    return (
        <article className="article-wrapper">
            <div className="article">
                <div className="article-image">
                    <img src={imgSrc} alt="defaultpostpic" />
                </div>
                <div className="article-title">
                    <h2>
                        {title}
                    </h2>
                </div>
                <div className="article-info">
                    <span className="article-category">
                        {category}
                    </span>

                    <span className="article-date">
                        {date}
                    </span>
                </div>
                <div className="article-text">
                    <p>{text}</p>
                </div>
            </div>
        </article>
    )
}