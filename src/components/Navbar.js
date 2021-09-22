import React, { useContext } from 'react'
import { Popover, Pane, Strong, Heading } from 'evergreen-ui'
import { Context } from '../App'
import LoginPopover from './AuthComponents/LoginPopover'
import { Auth } from 'aws-amplify'

const Navbar = () => {
  const { state, dispatch } = useContext(Context)

  const logout = async () => {
    try {
      await Auth.signOut()
      dispatch({
        type: 'LOGOUT',
      })
    } catch (e) {
      dispatch({
        type: 'ERROR_AUTH',
        error: e,
      })
    }
  }

  return (
    <Pane
      display="flex"
      alignItems="center"
      margin="auto"
      justifyContent="space-between"
      borderBottom="0.3px solid #72757e"
      padding="1.5ch"
      paddingX="5ch"
    >
      <Heading color="#fffffe">AWS-AMPLIFY-TUTORIAL</Heading>
      {state.user ? (
        <Strong color="#fffffe" onClick={logout}>
          Logout
        </Strong>
      ) : (
        <Popover content={<LoginPopover />}>
          <Strong color="#fffffe" marginRight="10ch">
            Login
          </Strong>
        </Popover>
      )}
    </Pane>
  )
}

export default Navbar
