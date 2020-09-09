import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userType } = useSelector((state) => state.auth)
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userType) {
          return <Component {...props} />
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}
