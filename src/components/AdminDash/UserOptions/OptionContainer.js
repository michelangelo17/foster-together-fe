import React from 'react'
import { Menu, LogOut, Display } from '../Navigation/navStyles'
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/thunks/authThunks'
import { useHistory } from 'react-router-dom'

const Container = () => {
  const dispatch = useDispatch()
  const { push } = useHistory()
  return (
    <Menu>
      <Display>
        <LogOut
          onClick={() => {
            dispatch(logout(push))
          }}
        >
          Log Out
        </LogOut>
      </Display>
    </Menu>
  )
}

export default Container
