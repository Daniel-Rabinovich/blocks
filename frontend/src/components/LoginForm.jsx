import { useState, useContext } from 'react'
import { AuthContext } from '../App'
import { login } from '../service/auth.js'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')

    const auth = useContext(AuthContext)

    const sendMsg = (a) => {
        setMsg(a)
        setTimeout(() => {
            setMsg('')
        }, 5000)
    }

    const formSubmissionHandler = async (event) => {
        event.preventDefault()
        try {
            const result = await login(username, password)
            if(result.error) throw result.error
            auth.setLogin({
                'loggedIn': true,
                'token': result.token,
                'username': result.username,
                'password': password
            })
        } catch (e) {
            if(e.message) sendMsg(e.message)
            else sendMsg(e)
        }
    }

    return (
        <div className='block'>
            <h1>Login/Register</h1>
            <form onSubmit={formSubmissionHandler}>
                <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <br /><br />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <br /><br />
                <button className='loginButton'>Submit</button>
                <p>{msg}</p>
            </form>
        </div>
    )
}

export default LoginForm
