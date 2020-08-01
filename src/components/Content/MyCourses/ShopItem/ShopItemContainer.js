import React from 'react'

import { Link } from 'react-router-dom'

import './ShopItem.css'

export const ShopItemContainer = ({ name, price, detailSrc }) => {
    return (
        <article className="shopItem-wrapper">
            <div className="shopItem">
                <div className="shopItem_data-wrapper">
                    <div className="shopItem-info">
                        <span className="shopItem-span">{name}</span>
                        <span className="shopItem-price">{price} рублей</span>
                    </div>
                    <span className="shopItem-a">
                        <Link to={detailSrc}>подробнее &rarr;</Link>
                    </span>
                </div>
            </div>
        </article>
    )
}