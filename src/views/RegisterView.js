import React, { useReducer, useContext } from 'react'
import { Pane, TextInput, Heading, Button, toaster } from 'evergreen-ui'
import { Auth } from 'aws-amplify'
import { Context } from '../App'
import ConfirmationModal from '../components/AuthComponents/ConfirmationModal'

const Register = () => {
  const { state, dispatch } = useContext(Context)

  const initialState = {
    username: '',
    password: '',
    email: '',
    openModal: false,
  }

  // create reducer
  function reducer(state, action) {
    switch (action.type) {
      case 'SET_INPUT':
        return { ...state, [action.inputName]: action.inputValue }
      case 'REGISTER_SUCCESS':
        return { ...state, openModal: true }
      case 'CLOSE_MODAL':
        return { ...state, openModal: false }
      default:
        return state
    }
  }

  // useReducer hook creates local state
  const [dispatchState, dispatchReducer] = useReducer(reducer, initialState)

  console.log(state, ' qui')
  console.log(dispatchState, ' qusi')

  // event handler
  function onChange(event) {
    dispatchReducer({
      type: 'SET_INPUT',
      inputName: event.target.name,
      inputValue: event.target.value,
    })
  }

  async function signup() {
    const { username, email, password } = dispatchState
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
      //open the modal when the sign up is successful
      dispatchReducer({ type: 'REGISTER_SUCCESS' })
    } catch (e) {
      console.log(e, ' in error')
      dispatch({
        type: 'ERROR_AUTH',
        error: e,
      })
      setTimeout(
        () =>
          dispatch({
            type: 'CLEAR_ERRORS',
          }),
        2000,
      )
    }
  }

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      backgroundColor="#242629"
    >
      {state.error && toaster.danger(state.error.message)}
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        padding="1ch"
        borderRadius="4px"
      >
        <Heading color="#fffffe" marginY="1ch">
          REGISTRATI
        </Heading>
        <TextInput
          color="#2cb67d"
          backgroundColor="#16161a"
          fontSize="600"
          borderColor="#16161a"
          marginY="1ch"
          onChange={onChange}
          name="username"
          required
          placeholder="username"
        ></TextInput>
        <TextInput
          color="#2cb67d"
          backgroundColor="#16161a"
          fontSize="600"
          borderColor="#16161a"
          marginY="1ch"
          onChange={onChange}
          name="email"
          type="email"
          required
          placeholder="email"
        ></TextInput>
        <TextInput
          color="#2cb67d"
          backgroundColor="#16161a"
          fontSize="600"
          borderColor="#16161a"
          marginY="1ch"
          onChange={onChange}
          name="password"
          required
          placeholder="password"
          type="password"
        ></TextInput>
        <Button
          onClick={signup}
          marginY="1ch"
          width="100%"
          style={{
            backgroundColor: '#7f5af0',
            color: '#fffffe',
            borderColor: '#7f5af0',
            fontWeight: 600,
          }}
        >
          SIGN UP
        </Button>
      </Pane>
      <ConfirmationModal
        user={dispatchState.username}
        isOpen={dispatchState.openModal}
        closeModal={() =>
          dispatchReducer({
            type: 'CLOSE_MODAL',
          })
        }
      />
    </Pane>
  )
}

export default Register
