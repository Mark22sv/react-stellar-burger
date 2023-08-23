import {
	SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,

  SIGNOUT_USER_REQUEST,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILED,

  SET_AUTH_CHECKED,
  SET_USER,

  UserActions

} from "../actions/user";
import { User } from "../types/data";

export type UserState = {
  user: User | null;
  isAuthChecked: boolean;
  loginRequest: boolean;
  loginFailed: boolean;
  updateRequest: boolean;
  updateFailed: boolean;
  signInRequest: boolean;
  signInFailed: boolean;
  signoutRequest: boolean;
  signoutFailed: boolean;
}

const initialState = {
  user: null,
  isAuthChecked: false,

  loginRequest: false,
	loginFailed: false,

  updateRequest: false,
	updateFailed: false,

  signInRequest: false,
	signInFailed: false,

  signoutRequest: false,
  signoutFailed: false,


};

export const authReducer = (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }

    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }

    case SET_USER_REQUEST:
			return {
				...state,
        loginRequest: true,
	      loginFailed: false,
	    }

		case SET_USER_FAILED:
			return {
				...state,
        loginRequest: false,
	      loginFailed: true,
			}

		case SET_USER_SUCCESS:
			return {
				...state,
        user: action.user,
				loginRequest: false
			}


    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updateRequest: true,
        updateFailed: false,
      }

    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateRequest: false,
        updateFailed: true,
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        updateRequest: false
      }

    case SIGNIN_USER_REQUEST:
      return {
        ...state,
        signInRequest: true,
        signInFailed: false,
      }

    case SIGNIN_USER_FAILED:
      return {
        ...state,
        signInRequest: false,
        signInFailed: true,
      }

    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        signInRequest: false
      }

    case SIGNOUT_USER_REQUEST: {
      return {
        ...state,
        signoutRequest: true,
        signoutFailed: false,

      }
    }
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        user: null,
        signoutRequest: false,
        signoutFailed: true,
      }
    }
    case SIGNOUT_USER_FAILED: {
      return {
        ...state,
        signoutRequest: false,
        signoutFailed: true,
      }
    }

    default: {
			return state;
		}
	}
};
