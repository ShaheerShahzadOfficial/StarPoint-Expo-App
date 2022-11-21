import {
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
  RESET_PASSWORD_EMAIL_RESET,

  LOAD_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER,

  FORGOT_PASSWORD_EMAIL_REQUEST,
  FORGOT_PASSWORD_EMAIL_RESET,
  FORGOT_PASSWORD_EMAIL,
  FORGOT_PASSWORD_EMAIL_FAIL,

  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,

  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE,
  DELETE_PROFILE_FAIL,

  GET_All_USERS_FAIL,
  GET_All_USERS_SUCCESS,
  GET_All_USERS_REQUEST,
  MY_PROFILE,
  MY_PROFILE_FAIL
} from '../Constant'

const initialState = {
  user: null,
  error: [],
  message: {},
}

export default function AuthReducer(state = initialState, actions) {
  switch (actions.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case FORGOT_PASSWORD_EMAIL_REQUEST:
    case RESET_PASSWORD_EMAIL_REQUEST:
      case DELETE_PROFILE_REQUEST:
      return {
        loading: true,
      }

      case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        return {
          loading: true,
          isAuthenticated: true,
        }

    case LOGIN_USER:
    case LOAD_USER:
      case MY_PROFILE:
      return {
        loading: false,
        isAuthenticated: true,
        user: actions.payload,
      }
      case REGISTER_USER:
      return{
        isAuthenticated:false,
        loading: false,
        success:true
      }

    case LOGOUT_USER:
      case DELETE_PROFILE:
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
      }

    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: actions.payload,
      }

    case LOAD_USER_FAIL:
    case MY_PROFILE_FAIL:
      return {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: actions.payload,
      }

    case LOGOUT_USER_FAIL:
      case DELETE_PROFILE_FAIL:
      return {
        error: actions.payload,
        loading: false,
       isAuthenticated:true
      }

    case FORGOT_PASSWORD_EMAIL:
      return {
        loading: false,
        message: actions.payload,
      }

    case FORGOT_PASSWORD_EMAIL_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

    case FORGOT_PASSWORD_EMAIL_RESET:
      return {
        message: false,
      }
    case UPDATE_PASSWORD:
      case UPDATE_PROFILE:
      return {
        loading: false,
        isAuthenticated: true,
        isUpdated: actions.payload,
      }
    case RESET_PASSWORD_EMAIL:
      return {
        loading: false,
        isUpdated: actions.payload,
      }

    case UPDATE_PASSWORD_FAIL:
    case RESET_PASSWORD_EMAIL_FAIL:
      case UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: actions.payload,
      }

    case UPDATE_PASSWORD_RESET:
    case RESET_PASSWORD_EMAIL_RESET:
      case UPDATE_PROFILE_RESET:
      return {
        loading: false,
        isUpdated: false,
        error: null,
      }

    default:
      return state
  }
}


export const allUsersReducer = (state=initialState, actions) => {

  switch (actions.type) {
    case GET_All_USERS_REQUEST:
      return{
        loading:true
      }
      case GET_All_USERS_SUCCESS:
        return{
          loading:false,
          users : actions.payload
        }
        case GET_All_USERS_FAIL:
        return{
          loading:false,
          error : actions.payload
        }
  
    default:
      return state;
  }
};
