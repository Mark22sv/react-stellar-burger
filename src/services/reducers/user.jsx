import {
	SET_USER_REQUEST,
  SET_USER_SUCCESS,
  SET_USER_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  ADD_USER,
  RESET_USER,

  SIGNIN_USER_REQUEST,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILED,

  SIGNOUT_USER_REQUEST,
  SIGNOUT_USER_SUCCESS,
  SIGNOUT_USER_FAILED,

  SET_AUTH_CHECKED,


} from "../actions/user";


const initialState = {
  user: {email:'', name:''},
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

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
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
        user: {
          ...state.user,
          name: action.user.user.name,
          email: action.user.user.email
        },
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
          user: {
            ...state.user,
            name: action.user.user.name,
            email: action.user.user.email
          },
          updateRequest: false
        }

    case SIGNIN_USER_REQUEST:
      return {
        ...state,
        signRequest: true,
        signFailed: false,
      }

    case SIGNIN_USER_FAILED:
      return {
        ...state,
        signRequest: false,
        signFailed: true,
      }

    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.user.name,
          email: action.user.user.email
        },
        signRequest: false
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
          user: {
            ...state.user,
            name: '',
            email: ''
          },
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

    case ADD_USER:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.user.name,
          email: action.user.user.email
        }
      }

    case RESET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          name: '',
          email: ''
        }
      }

		default: {
			return state;
		}
	}
};
