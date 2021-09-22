/*
Snippet to confirm the user code with a modal
*/

import React, { useState, useContext } from 'react'
import Context from '../../App'
import { Auth } from 'aws-amplify'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
} from '@chakra-ui/react'
import { toaster } from 'evergreen-ui'

import { TextInput } from 'evergreen-ui'

const ConfirmationModal = ({ user, isOpen, closeModal }) => {
  const [state, dispatch] = useContext(Context)

  const [confirmCode, setConfirmCode] = useState('')

  //handle to confirm sign up with Auth api
  const confirmSignUp = async (username, code) => {
    console.log(username, 'here')
    try {
      await Auth.confirmSignUp(username, code)
    } catch (error) {
      console.log('error confirming sign up', error)
    }
  }

  //handle to resend the confirmation code
  const resendConfirmationCode = async (username) => {
    try {
      await Auth.resendSignUp(username)

      dispatch({
        type: 'SET_INFO',
        info: 'Code resent succesfully',
      })
    } catch (err) {
      console.log('error resending code: ', err)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          {state.info && toaster.success('Code resent succesfully')}
          <ModalHeader>
            To continue we send you a confirmation code by email
          </ModalHeader>

          <ModalBody>
            <TextInput
              marginY="1ch"
              onChange={(e) => setConfirmCode(e.target.value)}
              name="code"
              required
              placeholder="code"
            ></TextInput>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => confirmSignUp(user, confirmCode)}
            >
              Confirm code
            </Button>
            <Button
              variant="ghost"
              onClick={() => resendConfirmationCode(user)}
            >
              Resend email
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ConfirmationModal
