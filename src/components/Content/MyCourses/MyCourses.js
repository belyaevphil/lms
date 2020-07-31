import React from 'react'

import { getSoldCourses } from '../../../DAL/endpoints'
import { CourseShop } from '../СourseShop/CourseShop'

export class MyCourses extends React.Component {
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

        this.fetchCourses = this.fetchCourses.bind(this)
    }

    async fetchCourses(currentPage) {
        try {
            const data = await getSoldCourses(currentPage)
            const { posts, count } = data.results
            this.setNewStateForUpdatePage(true, posts, count)
        } catch (e) {
            this.setNewStateForUpdatePage(true, [], 0, e)
        }
    }

    currentPageHandler = currentPage => {
        this.setState({
            currentPage
        })

    }

    setNewStateForUpdatePage = (isLoaded, items, totalCount, error = null) => {
        this.setState({
            isLoaded,
            items,
            totalCount,
            error
        })
    }

    componentDidMount() {
        this._isMounted = true
        const { currentPage } = this.state
        this.fetchCourses(currentPage)
    }

    componentDidUpdate(prevProps, prevState) {
        const { currentPage } = this.state
        if (currentPage !== prevState.currentPage) {
            this.fetchCourses(currentPage)
        }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        return (
            <CourseShop pagination={this.state} currentPageHandler={this.currentPageHandler} />
        )
    }
}
