import React from 'react'
import Navbar from '../components/Navbar'
import { toaster, Heading, Pane, Button } from 'evergreen-ui'

const Homepage = ({ error }) => {
  console.log(error)

  return (
    <div>
      {error && toaster.danger(error.message)}

      <Navbar />

      <Pane margin="30px" display="flex" flexDirection="column" width="50%">
        <Heading
          color="#2cb67d"
          fontSize="7ch"
          fontWeight="700"
          letterSpacing="0.3ch"
          lineHeight="2ch"
        >
          TRY SOMETHING NEW
        </Heading>
        <Pane display="flex" justifyContent="center" alignItems="center">
          <Heading
            color="#2cb67d"
            fontSize="7ch"
            fontWeight="700"
            letterSpacing="0.3ch"
            lineHeight="2ch"
          >
            EVERY DAY
          </Heading>
          <Button
            onClick={() => console.log('lol')}
            style={{
              backgroundColor: '#7f5af0',
              color: '#fffffe',
              borderColor: '#7f5af0',
              width: '20%',
            }}
          >
            SIGN UP
          </Button>
        </Pane>
      </Pane>
    </div>
  )
}

export default Homepage
