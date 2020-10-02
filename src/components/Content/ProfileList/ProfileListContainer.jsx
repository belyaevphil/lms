import React from 'react'

import { ProfileList } from './ProfileList'
import { getUsers } from '../../../DAL/endpoints'

export class ProfileListContainer extends React.Component {
    _isMounted = false

    constructor(props) {
        super(props)

        this.state = {
            totalCount: 0,
            currentPage: 1,
            error: null,
            isLoaded: false,
            items: []
        }

        this.fetchUsers = this.fetchUsers.bind(this)
    }

    async fetchUsers(currentPage) {
        try {
            const data = await getUsers(currentPage)
            const { posts, count } = data.results
            if (this._isMounted) {
                this.setNewStateForUpdatePage(true, posts, count)
            }
        } catch (e) {
            if (this._isMounted) {
                this.setNewStateForUpdatePage(true, [], 0, e)
            }
        }
    }

    currentPageHandler = currentPage => {
        if (this._isMounted) {
            this.setState({
                currentPage
            })
        }
    }

    setNewStateForUpdatePage = (isLoaded, items, totalCount, error = null) => {
        if (this._isMounted) {
            this.setState({
                isLoaded,
                items,
                totalCount,
                error
            })
        }
    }

    componentDidMount() {
        this._isMounted = true
        const { currentPage } = this.state
        this.fetchUsers(currentPage)
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentPage } = this.state
        if (currentPage !== prevState.currentPage) {
            this.fetchUsers(currentPage)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <ProfileList pagination={this.state} currentPageHandler={this.currentPageHandler} />
        )
    }
}