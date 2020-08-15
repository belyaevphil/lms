import React from 'react'
import { toast } from 'react-toastify'

import '../ModerationContent.css'
import { getCategories, createPost } from '../../../../../../DAL/endpoints'

export class ModerationCreateArticleContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryName: '',
            header: '',
            content: '',
            categories: [],

        }

        this.fetchCategories = this.fetchCategories.bind(this)
        this.createPostHandler = this.createPostHandler.bind(this)
    }

    async fetchCategories() {
        try {
            const response = await getCategories()
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            const { categories } = data
            this.setState({ categories, category: categories[0] })
        } catch (e) {
            toast.error(e.message)
        }
    }

    async createPostHandler(e) {
        e.preventDefault()
        try {
            const formData = new FormData(document.getElementById("moderation_content_form"))
            const response = await createPost(formData)
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            toast.success(data.message)
        } catch (e) {
            toast.error(e.message)
        }
    }

    changeHandler = (event) => {
        this.setState({ ...this.state, [event.target.name]: event.target.value })
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render() {
        const { categoryName, categories, content, header } = this.state

        return (
            <div className="moderationContent-wrapper">
                <div className="moderationContent">
                    <form id="moderation_content_form" className="moderationContent_form" onSubmit={this.createPostHandler} >
                        <h2>Новый пост</h2>
                        <div className="moderationContent_input">
                            <span>Заголовок</span>
                            <input type="textbox" value={header} name="header" onChange={this.changeHandler} />
                        </div>
                        <div className="moderationContent_input">
                            <span>Категория</span>
                            <select value={categoryName} name="categoryName" onChange={this.changeHandler} >
                                {categories.map(category => (
                                    <option key={`${category.id} ${category.name}`} >{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="moderationContent_input">
                            <span>Изображение</span>
                            <input type="file" accept="image/*" name="image" />
                        </div>
                        <div className="moderationContent_input">
                            <span>Описание</span>
                            <textarea value={content} name="content" onChange={this.changeHandler} ></textarea>
                        </div>
                        <div className="moderationContent_button">
                            <button type="submit" >Создать пост</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}