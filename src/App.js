import React, { useEffect, useReducer, createContext } from 'react'
import './App.css'
import '@aws-amplify/ui/dist/style.css'
import HomepageView from './views/HomepageView'
import { Auth } from 'aws-amplify'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Register from './views/RegisterView'
import { ChakraProvider } from '@chakra-ui/react'

export const Context = createContext()

function App() {
  //THE STATE OF THE App
  const initialState = {
    user: '',
    error: '',
    info: '',
  }

  // create reducer
  function reducer(state, action) {
    console.log(action.type)
    switch (action.type) {
      case 'SET_USER':
        return { ...state, user: action.user, error: '' }
      case 'LOGOUT':
        return { ...state, user: '', error: '' }
      case 'ERROR_AUTH':
        return {
          ...state,
          user: '',
          error: action.error,
        }
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: '',
        }
      case 'SET_INFO':
        return {
          ...state,
          info: action.info,
        }
      case 'CLEAR_INFO':
        return {
          ...state,
          info: '',
        }
      default:
        return state
    }
  }

  // useReducer hook creates local state
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const currentUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser()

        dispatch({
          type: 'SET_USER',
          user: user,
        })
      } catch (e) {
        console.log(e)
      }
    }
    currentUser()
  }, [])

  return (
    <Context.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Switch>
          <ChakraProvider>
            <div className="App">
              <Route
                path="/"
                render={() => <HomepageView error={state.error} />}
                exact
              />
              <Route path="/register" render={() => <Register />} />
            </div>
          </ChakraProvider>
        </Switch>
      </BrowserRouter>
    </Context.Provider>
  )
}

export default App
