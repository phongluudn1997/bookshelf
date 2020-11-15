import * as React from 'react'
import ReactDOM from 'react-dom'
import '@reach/dialog/styles.css'

import {Dialog} from '@reach/dialog'
import {Logo} from './components/logo'

function App() {
  const [modal, setModal] = React.useState('none')
  const handleSubmit = ({username, password}) => {
    console.log(username, password)
  }
  return (
    <>
      <Logo />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setModal('register')}>Register</button>
      </div>
      <Dialog aria-label={modal} isOpen={modal !== 'none'}>
        <button onClick={() => setModal('none')}>Close</button>
        <h3>{modal.toLocaleLowerCase()}</h3>
        <LoginForm buttonText={modal} onSubmit={handleSubmit} />
      </Dialog>
    </>
  )
}

function LoginForm({onSubmit, buttonText}) {
  const handleSubmit = e => {
    e.preventDefault()
    const {username, password} = e.target.elements
    onSubmit({username: username.value, password: password.value})
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input id="username" type="text" autoComplete="username" />
      </label>
      <label>
        Password
        <input id="password" type="password" autoComplete="current-password" />
      </label>
      <input type="submit" value={buttonText} />
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
