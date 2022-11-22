import axios from 'axios'
import {
  COMMENT_ON_POST_FAIL,
  COMMENT_ON_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_POST_FAIL,
  DELETE_COMMENT_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_SUCCESS,
  GET_MY_POST_FAIL,
  GET_MY_POST_SUCCESS,
  GET_POST_OF_FOLLOWING_FAIL,
  GET_POST_OF_FOLLOWING_SUCCESS,
  LIKE_AND_UNLIKE_POST_FAIL,
  LIKE_AND_UNLIKE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS
} from '../Constant'

export const CreateUserPost = (caption, files, Filetype) => async dispatch => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
    credentials: 'include'
  }

  await axios
    .post(
      'https://starpointbackend.vercel.app/post/upload',
      {
        caption,
        files,
        Filetype
      },
      config
    )
    .then(result => {
      dispatch({
        type: CREATE_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: CREATE_POST_FAIL,
        payload: err?.response?.data
      })
    })
}

export const DeletePost = id => async dispatch => {
  const config = { withCredentials: true, credentials: 'include' }

  await axios
    .delete(`https://starpointbackend.vercel.app/post/deletePost/${id}`, config)
    .then(result => {
      dispatch({
        type: DELETE_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: DELETE_POST_FAIL,
        payload: err?.response?.data
      })
    })
}

export const getPostOfFollowing = () => async dispatch => {
  const config = { withCredentials: true, credentials: 'include' }

  await axios
    .get(`https://starpointbackend.vercel.app/post/getPostOfFollowing`, config)
    .then(result => {
      dispatch({
        type: GET_POST_OF_FOLLOWING_SUCCESS,
        payload: result?.data?.posts
      })
    })
    .catch(err => {
      dispatch({
        type: GET_POST_OF_FOLLOWING_FAIL,
        payload: err?.response?.data
      })
    })
}

export const MyPost = () => async dispatch => {
  const config = { withCredentials: true, credentials: 'include' }

  await axios
    .get(`https://starpointbackend.vercel.app/user/getMyPosts`, config)
    .then(result => {
      dispatch({
        type: GET_MY_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_MY_POST_FAIL,
        payload: err?.response?.data
      })
    })
}

export const Like = id => async dispatch => {
  await axios
    .get(`https://starpointbackend.vercel.app/post/likeAndUnlikePost/${id}`, {
      withCredentials: true,
      credentials: 'include'
    })
    .then(result => {
      dispatch({
        type: LIKE_AND_UNLIKE_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: LIKE_AND_UNLIKE_POST_FAIL,
        payload: err?.response?.data
      })
    })
}

export const addComment = (id, comment) => async dispatch => {
  await axios
    .put(
      `https://starpointbackend.vercel.app/post/commentOnPost/${id}`,
      {
        comment
      },
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    .then(result => {
      dispatch({
        type: COMMENT_ON_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: COMMENT_ON_POST_FAIL,
        payload: err?.response?.data
      })
    })
}

export const deleteComment = (id, commentId) => async dispatch => {
  await axios
    .put(
      `https://starpointbackend.vercel.app/post/DeleteCommentPost/${id}`,
      {
        commentId
      },
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    .then(result => {
      dispatch({
        type: DELETE_COMMENT_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: DELETE_COMMENT_POST_FAIL,
        payload: err?.response?.data
      })
    })
}

export const updateCaption = (id, caption) => async dispatch => {
  dispatch({
    type: UPDATE_POST_REQUEST
  })
  await axios
    .put(
      `https://starpointbackend.vercel.app/post/updateCaption/${id}`,
      {
        caption
      },
      {
        withCredentials: true,
        credentials: 'include'
      }
    )
    .then(result => {
      dispatch({
        type: UPDATE_POST_SUCCESS,
        payload: result?.data
      })
    })
    .catch(err => {
      dispatch({
        type: UPDATE_POST_FAIL,
        payload: err?.response?.data
      })
    })
}
