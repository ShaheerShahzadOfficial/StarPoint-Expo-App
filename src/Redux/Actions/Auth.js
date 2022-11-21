import axios from 'axios'

import {
  FORGOT_PASSWORD_EMAIL,
  FORGOT_PASSWORD_EMAIL_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGOUT_USER,
  LOGOUT_USER_FAIL,
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  RESET_PASSWORD_EMAIL,
  RESET_PASSWORD_EMAIL_REQUEST,
  RESET_PASSWORD_EMAIL_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER,
  LOAD_USER_FAIL,
  FORGOT_PASSWORD_EMAIL_REQUEST,
} from '../Constant'

export const RegisterUser = (name, email, password, avatar) => async (
  dispatch,
) => {
  dispatch({ type: REGISTER_USER_REQUEST })

  const config = { headers: { 'Content-Type': 'multipart/form-data' } }

  await axios
    .post(
      'https://starpointbackend.vercel.app/auth/signup',
      {
        name,
        email,
        password,
        avatar,
      },
      config,
    )
    .then((result) => {
      dispatch({
        type: REGISTER_USER,
        payload: result.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: err?.response?.data,
      })
    })
}

export const LoginUser = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_USER_REQUEST })

  await axios
    .post(
      'https://starpointbackend.vercel.app/auth/login',
      {
        email,
        password,
      },
      {
        withCredentials: true,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      },
    )
    .then((result) => {
      dispatch({
        type: LOGIN_USER,
        payload: result.data?.user,
      })
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: err?.response?.data,
      })
    })
}

export const ForgotPasswordEmail = (email) => async (dispatch) => {

  dispatch({
    type: FORGOT_PASSWORD_EMAIL_REQUEST,
  })

  await axios
    .post(
      'https://starpointbackend.vercel.app/auth/forgot/password',
      {
        email,
      },
      { withCredentials: true, credentials: 'include' },
    )
    .then((result) => {
      dispatch({
        type: FORGOT_PASSWORD_EMAIL,
        payload: result.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: FORGOT_PASSWORD_EMAIL_FAIL,
        payload:  err?.response?.data,
      })
    })
}

export const Logout = () => async (dispatch) => {
  await axios
    .delete('https://starpointbackend.vercel.app/auth/logout', {
      withCredentials: true,
      credentials: 'include',
    })
    .then(() => {
      dispatch({
        type: LOGOUT_USER,
      })
    })
    .catch((err) => {
      dispatch({
        type: LOGOUT_USER_FAIL,
        payload: err?.response?.data,
      })
    })
}

export const ResetPasswordUser = (token, password, confirmPassword) => async (
  dispatch,
) => {
  dispatch({ type: RESET_PASSWORD_EMAIL_REQUEST })

  await axios
    .put(
      `https://starpointbackend.vercel.app/auth/password/reset/${token}`,
      {
        password,
        confirmPassword,
      },
      { withCredentials: true, credentials: 'include' },
    )
    .then((result) => {
      dispatch({
        type: RESET_PASSWORD_EMAIL,
        payload: result.data,
      })
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_EMAIL_FAIL,
        payload:  err?.response?.data,
      })
    })
}

export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get('https://starpointbackend.vercel.app/user/me', {
      withCredentials: true,
      credentials: 'include',
    })
    dispatch({
      type: LOAD_USER,
      payload: data.user,
    })
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data,
    })
  }
}
