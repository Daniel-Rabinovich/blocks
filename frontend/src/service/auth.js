//
// auth logic here
//

const server = 'http://localhost:3000'

export const login = async (username, password) => {

    const result = await fetch(`${server}/api/auth/login`, {
        method: 'post',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    const resultJson = await result.json()
    return resultJson

}

export const logout = async () => {

    return await fetch(`${server}/api/auth/logout`)

}


