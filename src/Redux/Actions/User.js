import axios from 'axios'

import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FAIL,
  DELETE_PROFILE_FAIL,
  DELETE_PROFILE,
  DELETE_PROFILE_REQUEST,
  GET_All_USERS_REQUEST,
  GET_All_USERS_SUCCESS,
  GET_All_USERS_FAIL,
  GET_USERS_PROFILE_REQUEST,
  GET_USERS_PROFILE_SUCCESS,
  GET_USERS_PROFILE_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  MY_PROFILE,
  MY_PROFILE_FAIL
} from '../Constant'

export const UpdateUserProfile = (name, email, avatar) => async dispatch => {
  dispatch({ type: UPDATE_PROFILE_REQUEST })

  await axios
    .put(
      'https://starpointbackend.vercel.app/user/updateProfile',
      {
        name,
        email,
        avatar
      },
      { withCredentials: true, credentials: 'include' }
    )
    .then(result => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: result.data
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: err?.response?.data
      })
    })
}

export const UpdateUsersPassword = (oldPassword, newPassword) => async (dispatch) => {
  dispatch({ type: UPDATE_PASSWORD_REQUEST })

  await axios
    .put(
      'https://starpointbackend.vercel.app/user/updatePassword',
      {
        oldPassword,
        newPassword
      },
      { withCredentials: true, credentials: 'include' }
    )
    .then(result => {
      dispatch({
        type: UPDATE_PASSWORD,
        payload: result.data
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: err.response.data.message
      })
    })
}

export const DeleteProfile = () => async dispatch => {
  dispatch({ type: DELETE_PROFILE_REQUEST })

  await axios
    .delete('https://starpointbackend.vercel.app/user/deleteMyAccount', {
      withCredentials: true,
      credentials: 'include'
    })
    .then(result => {
      dispatch({
        type: DELETE_PROFILE,
        payload: result.data
      })
    })
    .catch(err => {
      dispatch({
        type: DELETE_PROFILE_FAIL,
        payload: err.response.data.message
      })
    })
}

export const getAllUser = (name = '') => async dispatch => {
  try {
    dispatch({ type: GET_All_USERS_REQUEST })

    const { data } = await axios.get(
      `https://starpointbackend.vercel.app/user/getAllUsers?name=${name}`,
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    dispatch({
      type: GET_All_USERS_SUCCESS,
      payload: data?.users
    })
  } catch (error) {
    dispatch({
      type: GET_All_USERS_FAIL,
      payload: error?.response?.data
    })
  }
}

export const getUsersProfile = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://starpointbackend.vercel.app/user/getUserProfile/${id}`,
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    dispatch({
      type: GET_USERS_PROFILE_SUCCESS,
      payload: data?.user
    })
  } catch (error) {
    dispatch({
      type: GET_USERS_PROFILE_FAIL,
      payload: error?.response?.data
    })
  }
}

export const followAndUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOW_USER_REQUEST })

    const { data } = await axios.get(
      `https://starpointbackend.vercel.app/user/followAndUnfollowUser/${id}`,
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload: error?.response?.data
    })
  }
}


export const myProfile = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://starpointbackend.vercel.app/user/myProfile`,
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    dispatch({
      type: MY_PROFILE ,
      payload: data?.user
    })
  } catch (error) {
    dispatch({
      type: MY_PROFILE_FAIL,
      payload: error?.response?.data
    })
  }
}