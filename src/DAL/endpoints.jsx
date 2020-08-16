const baseURL = 'http://localhost:5000'

export const getPosts = async (currentPage) => {
    const response = await fetch(`${baseURL}/api/posts/get?page=${currentPage}`)
    return response.json()
}

export const getUsers = async (currentPage) => {
    const response = await fetch(`${baseURL}/api/users/get?page=${currentPage}`)
    return response.json()
}

export const getAvailableCourses = async (currentPage) => {
    return fetch(`${baseURL}/api/courses/getavailable?page=${currentPage}`, {
        credentials: 'include',
    })
}

export const getSoldCourses = async (currentPage) => {
    const response = await fetch(
        `${baseURL}/api/courses/getsold?page=${currentPage}`,
        {
            credentials: 'include',
        }
    )
    return response.json()
}

export const getCategories = async () => {
    return fetch(`${baseURL}/api/categories/get`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const createPost = async (formData) => {
    return fetch(`${baseURL}/api/posts/create`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
    })
}

export const createCategory = async (body) => {
    return fetch(`${baseURL}/api/categories/create`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const buyCourse = async (body) => {
    return fetch(`${baseURL}/api/courses/buy`, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const checkBoughtCourses = async () => {
    return fetch(`${baseURL}/api/courses/checkboughtcourses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const getMyProfile = async () => {
    return fetch(`${baseURL}/api/categories/myprofile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export const checkLoginStatus = async () => {
    return fetch(`${baseURL}/api/users/checkloginstatus`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getCourseById = async (courseId) => {
    return fetch(`${baseURL}/api/courses/get?id=${courseId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const getUserById = async (userId) => {
    return fetch(`${baseURL}/api/users/profiles?id=${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const logout = async () => {
    return fetch(`${baseURL}/api/users/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
