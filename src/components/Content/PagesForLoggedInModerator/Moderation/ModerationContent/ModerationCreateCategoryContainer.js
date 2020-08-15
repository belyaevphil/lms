import React from 'react'
import { toast } from 'react-toastify'

import { createCategory } from '../../../../../../DAL/endpoints'

import '../ModerationContent.css'

export class ModerationCreateCategoryContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryName: ''
        }

        this.createCategoryHandler = this.createCategoryHandler.bind(this)
    }

    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    async createCategoryHandler() {
        try {
            const body = JSON.stringify({ ...this.state })
            const response = await createCategory(body)
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            toast.success(data.message)
        } catch (e) {
            toast.error(e.message)
        }
    }

    render() {
        const { categoryName } = this.state

        return (
            <div className="moderationContent-wrapper">
                <div className="moderationContent">
                    <form className="moderationContent_form">
                        <h2>Новая категория</h2>
                        <div className="moderationContent_input">
                            <span>Название</span>
                            <input
                                type="textbox"
                                onChange={this.changeHandler}
                                name="categoryName"
                                value={categoryName}
                            />
                        </div>
                        <div className="moderationContent_button">
                            <button onClick={this.createCategoryHandler} >Создать категорию</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}