import {
  COMMENT_ON_POST_FAIL,
  COMMENT_ON_POST_REQUEST,
  COMMENT_ON_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_RESET,
  CREATE_POST_SUCCESS,
  DELETE_COMMENT_POST_FAIL,
  DELETE_COMMENT_POST_REQUEST,
  DELETE_COMMENT_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
  DELETE_POST_SUCCESS,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  GET_MY_POST_FAIL,
  GET_MY_POST_REQUEST,
  GET_MY_POST_SUCCESS,
  GET_POST_OF_FOLLOWING_FAIL,
  GET_POST_OF_FOLLOWING_REQUEST,
  GET_POST_OF_FOLLOWING_SUCCESS,
  GET_USERS_POST_FAIL,
  GET_USERS_POST_REQUEST,
  GET_USERS_POST_SUCCESS,
  GET_USERS_PROFILE_FAIL,
  GET_USERS_PROFILE_REQUEST,
  GET_USERS_PROFILE_SUCCESS,
  LIKE_AND_UNLIKE_POST_FAIL,
  LIKE_AND_UNLIKE_POST_REQUEST,
  LIKE_AND_UNLIKE_POST_RESET,
  LIKE_AND_UNLIKE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_RESET,
  UPDATE_POST_SUCCESS,
} from '../Constant'

const initialState = {
  post: [],
  error: [],
  message: {},
  user: [],
}

export function PostReducer(state = initialState, actions) {
  switch (actions.type) {
    case CREATE_POST_REQUEST:
        return {
          loading: true,
        }
    case CREATE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      }
      case  CREATE_POST_RESET:
        return{
          success: false,
        }
        case DELETE_POST_RESET:
          return {
            loading: false,
            isDeleted: false,
          }

          case UPDATE_POST_RESET:
            return {
              loading: false,
              isUpdated: false,
            }
    case UPDATE_POST_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
      }
    case DELETE_POST_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
      }

    case CREATE_POST_FAIL:
    case UPDATE_POST_FAIL:
    case DELETE_POST_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

    default:
      return state
  }
}

export function MyPostReducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_MY_POST_REQUEST:
      return {
        loading: true,
      }
    case GET_MY_POST_SUCCESS:
      return {
        loading: false,
        post: actions.payload,
      }
    case GET_MY_POST_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

    default:
      return state
  }
}

export function userPostsReducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_POST_OF_FOLLOWING_REQUEST:
    case GET_USERS_POST_REQUEST:
      return {
        loading: true,
      }
    case GET_POST_OF_FOLLOWING_SUCCESS:
    case GET_USERS_POST_SUCCESS:
      return {
        loading: false,
        post: actions.payload,
      }
    case GET_POST_OF_FOLLOWING_FAIL:
    case GET_USERS_POST_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

    default:
      return state
  }
}

export function LikeAndCommentReducer(state = initialState, actions) {
  switch (actions.type) {
    case LIKE_AND_UNLIKE_POST_REQUEST:
    case COMMENT_ON_POST_REQUEST:
    case DELETE_COMMENT_POST_REQUEST:
      return {
        loading: true,
      }
    case LIKE_AND_UNLIKE_POST_SUCCESS:
    case COMMENT_ON_POST_SUCCESS:
    case DELETE_COMMENT_POST_SUCCESS:
      return {
        loading: false,
        message: actions.payload?.message,
      }
    case LIKE_AND_UNLIKE_POST_FAIL:
    case COMMENT_ON_POST_FAIL:
    case DELETE_COMMENT_POST_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

      case LIKE_AND_UNLIKE_POST_RESET:
        return{
          loading: false,
          message: null
        }

    default:
      return state
  }
}

export function UserProfileReducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_USERS_PROFILE_REQUEST:
      return {
        loading: true,
      }
    case GET_USERS_PROFILE_SUCCESS:
      return {
        loading: false,
        user: actions.payload,
      }
    case GET_USERS_PROFILE_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }
    default:
      return state
  }
}




export function FollowReducer(state = initialState, actions) {

switch (actions.type) {
  case FOLLOW_USER_REQUEST:
   return{
    loading:true
   }

   case FOLLOW_USER_SUCCESS:
   return{
    loading:false,
    message : actions.payload
   }

   case FOLLOW_USER_FAIL:
   return{
    loading:false,
    error : actions.payload
   }

  default:
    return state;
}

  }