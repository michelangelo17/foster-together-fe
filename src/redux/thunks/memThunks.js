import {
  setMembersArray,
  setMemError,
  setSelectedMember,
} from '../slices/memSlice'
import { setUserInfo } from '../slices/authSlice'
import { invokeAPIGateway } from '../../aws'

export const getMembers = () => async (dispatch) => {
  try {
    const data = await invokeAPIGateway(
      process.env.REACT_APP_API_GATEWAY,
      'members',
      'GET'
    )

    dispatch(setMembersArray(await data.json()))
  } catch (error) {
    dispatch(setMemError(error.message))
    // console.log(error)
  }
}

export const getMemberById = (id) => async (dispatch) => {
  try {
    const data = await invokeAPIGateway(
      process.env.REACT_APP_API_GATEWAY,
      `/members/${id}`,
      'GET'
    )
    const { Item } = await data.json()
    dispatch(setSelectedMember(Item))
  } catch (error) {
    dispatch(setMemError(error.message))
  }
}

export const postMember = (user, push) => async (dispatch) => {
  try {
    await invokeAPIGateway(
      process.env.REACT_APP_API_GATEWAY,
      'members',
      'POST',
      user
    )
  } catch (error) {
    dispatch(setMemError(error.message))
    // console.log(error)
  }

  dispatch(setUserInfo(user))

  if (user.type === 'neighbors') {
    push('/application')
  } else push('/login')
}

export const updateMemberApplicationStatus = (id, app_status) => async (
  dispatch
) => {
  try {
    await invokeAPIGateway(
      process.env.REACT_APP_API_GATEWAY,
      `members/${id}`,
      'PUT',
      { app_status }
    )
    dispatch(getMemberById(id))
  } catch (error) {
    dispatch(setMemError(error.message))
    // console.log(error)
  }
}

export const sendApplicationDecisionEmail = (values) => async (dispatch) => {
  console.log('Sent data: ', values)
  try {
    const res = await invokeAPIGateway(
      process.env.REACT_APP_API_GATEWAY,
      'members/application',
      'POST',
      values
    )
    // Res will be used for message later
    console.log(res)
  } catch (error) {
    dispatch(setMemError(error.message))
  }
}

// *** FOR MAP DATA: Pust before the try/catch in postMember ***
// *************************************************************

// const map = await axios.get(
//   `https://api.mapbox.com/geocoding/v5/mapbox.places/${user.address}%20${user.city}%20${user.state}.json?country=US&access_token=${MAPBOX_KEY}`
// )

// user.longitude = map.data.features[0].geometry.coordinates[0]
// user.latitude = map.data.features[0].geometry.coordinates[1]
