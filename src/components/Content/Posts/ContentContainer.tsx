import React from 'react'

import { Content } from './Content'
import { getPosts } from '../../../DAL/endpoints'

export class ContentContainer extends React.Component {
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

        this.fetchPosts = this.fetchPosts.bind(this)
    }

    async fetchPosts(currentPage) {
        const cp = currentPage
        try {
            const data = await getPosts(cp)
            const { posts, count } = data.results
            const { currentPage } = this.state
            if (this._isMounted) {
                this.setState({
                    isLoaded: true,
                    items: posts,
                    totalCount: count,
                    currentPage,
                    error: null
                })
            }
        } catch (e) {
            if (this._isMounted) {
                const { currentPage } = this.state
                this.setState({
                    isLoaded: true,
                    items: [],
                    totalCount: 0,
                    currentPage,
                    error: e.message
                })
            }
        }
    }

    currentPageHandler = currentPage => {
        if (this._isMounted) {
            this.setState({
                ...this.state,
                currentPage
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentPage } = this.state
        if (currentPage !== prevState.currentPage) {
            this.fetchPosts(currentPage)
        }
    }

    componentDidMount() {
        this._isMounted = true
        const { currentPage } = this.state
        this.fetchPosts(currentPage)
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return <Content pagination={this.state} currentPageHandler={this.currentPageHandler} />
    }
}