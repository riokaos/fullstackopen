import React, { useState, useImperativeHandle  } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(props.startOpen)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button  size="small" variant="outlined" color="primary" onClick={toggleVisibility}>
          hide
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable
