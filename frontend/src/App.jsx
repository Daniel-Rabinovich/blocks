import { createContext, useState } from 'react'
import LoginForm from './components/LoginForm'
import Blocks from './components/Blocks'
import Header from './components/Header'
import Explain from './components/Explain'

export const AuthContext = createContext(false)

function App() {

  const [login, setLogin] = useState({
    'loggedIn': false,
    'username': '',
    'token': '',
    'password': ''
  })

  return (
    <AuthContext.Provider value={{login, setLogin}}>
      <Header />
      <div>
        {!login.loggedIn && <><LoginForm /> <Explain /></>}
        {login.loggedIn && <Blocks />}
      </div>
    </AuthContext.Provider>
  )
}

export default App
