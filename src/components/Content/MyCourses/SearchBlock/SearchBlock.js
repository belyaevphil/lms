import React from 'react';
import './SearchBlock.css';

export default class SearchBlockContainer extends React.Component {
    render() {
        return (
            <div className="searchBlock-wrapper">
                <div className="searchBlock">
                    <input type="textbox" className="searchBlock-textbox" placeholder="поиск..." /> <button className="searchBlock-button">Найти</button>
                </div>
            </div>
        )
    }
}