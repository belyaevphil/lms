const baseURL = 'http://localhost:5000'

export const activateAccount = async (body) => {
    return fetch(`${baseURL}/api/users/activate`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const changePassword = async (body) => {
    return fetch(`${baseURL}/api/users/changepassword`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const forgotPassword = async (body) => {
    return fetch(`${baseURL}/api/users/forgotpassword`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const login = async (body) => {
    return fetch(`${baseURL}/api/users/login`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const register = async (body) => {
    return fetch(`${baseURL}/api/users/register`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const restorePassword = async (body) => {
    return fetch(`${baseURL}/api/users/restorepassword`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
