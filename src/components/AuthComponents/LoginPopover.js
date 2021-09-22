import React, { useReducer, useContext } from 'react'
import { Pane, TextInput, Heading, Button, Text, Link } from 'evergreen-ui'
import { Auth } from 'aws-amplify'
import { Context } from '../../App'

const LoginPopover = () => {
  const { dispatch } = useContext(Context)

  const initialState = {
    username: '',
    password: '',
  }

  // create reducer
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_INPUT':
        return { ...state, [action.inputName]: action.inputValue }

      default:
        return state
    }
  }

  // useReducer hook creates local state
  const [reducerState, reducerDispatch] = useReducer(reducer, initialState)

  // Class method to log in a user
  async function signIn() {
    const { username, password } = reducerState
    try {
      const user = await Auth.signIn({ username, password })
      dispatch({
        type: 'SET_USER',
        user: user,
      })
      console.log('user successfully logged in!')
    } catch (err) {
      console.log(err, ' in errore')
      dispatch({
        type: 'ERROR_AUTH',
        error: err,
      })
    }
  }

  // event handler
  function onChange(event) {
    reducerDispatch({
      type: 'SET_INPUT',
      inputName: event.target.name,
      inputValue: event.target.value,
    })
  }

  return (
    <Pane
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="1ch"
      justifyContent="space-between"
    >
      <Heading size="200" marginY="1ch">
        Accedi
      </Heading>
      <TextInput
        marginY="1ch"
        onChange={onChange}
        name="username"
        required
        placeholder="username"
      ></TextInput>
      <TextInput
        onChange={onChange}
        name="password"
        required
        placeholder="password"
        type="password"
      ></TextInput>

      <Button
        onClick={signIn}
        marginY="1ch"
        width="100%"
        style={{ backgroundColor: '#7f5af0', color: '#fffffe' }}
      >
        Log in
      </Button>
      <Pane display="flex" justifyContent="space-between" width="100%">
        <Text>Non sei registrato? </Text>
        <Link href="/register">Registrati </Link>
      </Pane>
    </Pane>
  )
}

export default LoginPopover
