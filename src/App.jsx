import React, { Component } from 'react'
import { LoggedInModerator } from './components/Content/PagesForLoggedInModerator/LoggedInModerator'
import { LoggedInUser } from './components/Content/PagesForLoggedInUser/LoggedInUser'
import { LoggedOut } from './components/Content/PagesForLoggedOut/LoggedOut'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loginStatus: false,
      role: null
    }
  }

  async checkLoginStatus() {
    try {
      const response = await fetch('http://localhost:5000/api/users/checkloginstatus', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (!response.ok && this.state.loginStatus) window.location.reload()
      const { loginStatus, role } = data
      if (loginStatus && !this.state.loginStatus) {
        this.setState({
          loginStatus: true,
          role
        })
      } else if (!loginStatus) {
        this.setState({
          loginStatus: false,
          role: null
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  loginHandler = role => {
    this.setState({
      loginStatus: true,
      role
    })
  }

  logoutHandler = () => {
    this.setState({
      loginStatus: false,
      role: null
    })
  }

  componentDidMount() {
    this.checkLoginStatus()
  }

  render() {
    const { loginStatus, role } = this.state

    if (loginStatus && role === 'Пользователь') {
      return <LoggedInUser logoutHandler={this.logoutHandler} />
    } else if (loginStatus && role === 'Модератор') {
      return <LoggedInModerator logoutHandler={this.logoutHandler} />
    } else {
      return <LoggedOut loginHandler={this.loginHandler} />
    }
  }
}