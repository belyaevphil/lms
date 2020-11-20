import React, { Component } from 'react'

import { getCourseById, buyCourse } from '../../../DAL/endpoints'

import './CourseShop.css'

export class CourseShopItemContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            description: '',
            price: '',
            error: null
        }

        this.buyCourseHandler = this.buyCourseHandler.bind(this)
        this.fetchCourseHandler = this.fetchCourseHandler.bind(this)
    }

    async fetchCourseHandler() {
        try {
            const courseId = this.props.match.params.id
            const response = await getCourseById(courseId)
            const data = await response.json()
            const { name, description, price } = data
            this.setState({
                name,
                description,
                price,
                error: null
            })
        } catch (e) {
            this.setState({
                name: '',
                description: '',
                price: '',
                error: e.message
            })
        }
    }

    async buyCourseHandler() {
        try {
            const { name, price } = this.state
            const body = JSON.stringify({ name, price })
            const response = await buyCourse(body)
            const data = await response.json()
            console.log(data)
        } catch (e) {
            console.error(e.message)
        }
    }

    componentDidMount() {
        this.fetchCourseHandler()
    }

    render() {
        const { name, description, price } = this.state

        return (
            <div id="wrapper" >
                <div id="content" >
                    <h1>{`Курс "${name}"`}</h1>
                    <h3>Описание</h3>
                    <p>{description}</p>
                    <button onClick={this.buyCourseHandler}>Приобрести</button>
                    <span>{`Стоимость: ${price}`}</span>
                </div>
            </div>
        )
    }
}