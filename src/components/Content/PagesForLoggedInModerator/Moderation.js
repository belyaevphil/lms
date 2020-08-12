import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { ModerationMenuContainer } from './Moderation/ModerationMenu/ModerationMenuContainer'
import { ModerationCreateArticleContainer } from './Moderation/ModerationContent/ModerationCreateArticle/ModerationCreateArticleContainer'
import { ModerationCreateCategoryContainer } from './Moderation/ModerationContent/ModerationCreateCategory/ModerationCreateCategoryContainer'

import './Moderation/Moderation.css'
import { ModerationGettingStarted } from './ModerationGettingStarted'

export const Moderation = () => {
    return (
        <div className="moderation-wrapper">
            <div className="moderation">
                <ModerationMenuContainer />
                <Switch>
                    <Route exact path='/moderation' component={ModerationGettingStarted} />
                    <Route exact path='/moderation/createpost' component={ModerationCreateArticleContainer} />
                    <Route exact path='/moderation/createcategory' component={ModerationCreateCategoryContainer} />
                </Switch>
            </div>
        </div>
    )
}
