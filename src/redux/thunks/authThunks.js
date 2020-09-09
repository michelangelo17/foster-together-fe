import { setAuthError, setUserType, setUserInfo } from '../slices/authSlice'
import { Auth } from 'aws-amplify'
import jwtDecode from 'jwt-decode'
import { postMember } from './memThunks'

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const { attributes } = await Auth.signIn(email, password)

    const session = await Auth.currentSession()
    const sessionIdInfo = jwtDecode(session.getIdToken().jwtToken)
    const userType = sessionIdInfo['cognito:groups'][0]

    dispatch(setUserType(userType))

    dispatch(
      setUserInfo({
        email: attributes.email,
        first_name: attributes['custom:first_name'] || '',
      })
    )
  } catch (error) {
    dispatch(setAuthError(error.message))
    // console.log(error)
  }
}

export const register = (user, push) => async (dispatch) => {
  try {
    await Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {
        'custom:type': user.type,
      },
    })

    delete user.password
    delete user.confirmPassword

    dispatch(postMember(user, push))
  } catch (error) {
    dispatch(setAuthError(error.message))
    // console.log(error)
  }
}

export const logout = (push) => async (dispatch) => {
  try {
    await Auth.signOut()

    dispatch(setUserInfo(null))
    dispatch(setUserType(null))
  } catch (error) {
    dispatch(setAuthError(error.message))
    // console.log(error)
  }
  push('/login')
}
