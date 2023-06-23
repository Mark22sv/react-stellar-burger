import {
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	GET_USER_FAILED,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN_FORM_FAILED,
	LOGIN_FORM_REQUEST,
	LOGIN_FORM_SET_VALUE,
	LOGIN_FORM_SUCCESS,
	LOGOUT_FORM_FAILED,
	LOGOUT_FORM_REQUEST,
	LOGOUT_FORM_SUCCESS,
	PATCH_USER_FAILED,
	PATCH_USER_REQUEST,
	PATCH_USER_SUCCESS,
	REGISTER_FORM_FAILED,
	REGISTER_FORM_REQUEST,
	REGISTER_FORM_SET_VALUE,
	REGISTER_FORM_SUCCESS,
	RESET_FORM_SET_VALUE,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	UPDATE_TOKEN_FAILED,
	UPDATE_TOKEN_REQUEST,
	UPDATE_TOKEN_SUCCESS
} from "../actions/auth";


const initialState = {
	message: '',

	forgetPassRequest: false,
	forgetPassFailed: false,
	forgetPassSuccess: false,

	resetPassRequest: false,
	resetPassFailed: false,
	resetPassSuccess: false,

	form: {
		email: '',
		password: '',
		code: '',
		name: ''
	},

	user: {
		email: '',
		name: '',
	},

	loginRequest: false,
	loginFailed: false,
	loginSuccess: false,

	logoutRequest: false,
	logoutFailed: false,

	getUserRequest: false,
	getUserFailed: false,

	updateUserRequest: false,
	updateUserFailed: false,

	updateupdateTokenRequest: false,
	updateupdateTokenSuccess: false,
	updateupdateTokenFailed: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_REQUEST: {
			return {
				...state,
				getUserFailed: false,
				getUserRequest: true,
			};
		}
		case GET_USER_FAILED: {
			return {
				...state,
				getUserFailed: true,
				getUserRequest: false,
			};
		}
		case GET_USER_SUCCESS: {
			return {
				...state,
				user: action.user,
				getUserRequest: false,
				getUserFailed: false,
			};
		}
		case FORGOT_PASSWORD_REQUEST: {
			return {
				...state,
				forgetPassFailed: false,
				forgetPassRequest: true
			};
		}
		case FORGOT_PASSWORD_FAILED: {
			return {
				...state,
				forgetPassFailed: true,
				forgetPassRequest: false
			};
		}
		case FORGOT_PASSWORD_SUCCESS: {
			return {
				...state,
				form: {
					...state.form,
					email: ''
				},
				message: action.message,
				forgetPassRequest: false,
				forgetPassFailed: false,
				forgetPassSuccess: true,
			};
		}
		case RESET_FORM_SET_VALUE: {
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.value
				}
			};
		}
		case RESET_PASSWORD_REQUEST: {
			return {
				...state,
				resetPassFailed: false,
				resetPassRequest: true
			};
		}
		case RESET_PASSWORD_FAILED: {
			return {
				...state,
				resetPassFailed: true,
				resetPassRequest: false
			};
		}
		case RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				resetPassRequest: false,
				resetPassFailed: false,
				resetPassSuccess: true
			};
		}
		case LOGIN_FORM_SET_VALUE: {
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.value
				}
			};
		}
		case LOGIN_FORM_REQUEST: {
			return {
				...state,
				loginFailed: false,
				loginRequest: true
			};
		}
		case LOGIN_FORM_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false
			};
		}
		case LOGIN_FORM_SUCCESS: {
			return {
				...state,
				user: action.user,
				form: {
					...state.form,
					email: '',
					password: '',
				},
				loginRequest: false,
				loginFailed: false,
				loginSuccess: true,
			};
		}
		case LOGOUT_FORM_REQUEST: {
			return {
				...state,
				logoutFailed: false,
				logoutRequest: true
			};
		}
		case LOGOUT_FORM_FAILED: {
			return {
				...state,
				logoutFailed: true,
				logoutRequest: false
			};
		}
		case LOGOUT_FORM_SUCCESS: {
			return {
				...state,
				user: {
					...state.user,
					email: '',
					name: '',
				},
				logoutFailed: true,
				logoutRequest: false
			}
		}
		case REGISTER_FORM_SET_VALUE: {
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.value
				}
			};
		}
		case REGISTER_FORM_REQUEST: {
			return {
				...state,
				loginFailed: false,
				loginRequest: true
			};
		}
		case REGISTER_FORM_FAILED: {
			return {
				...state,
				loginFailed: true,
				loginRequest: false
			};
		}
		case REGISTER_FORM_SUCCESS: {
			return {
				...state,
				user: action.playload,
				form: {
					...state.form,
					email: '',
					password: '',
					name: ''
				},
				loginRequest: false,
				loginFailed: false,
				loginSuccess: true,
			};
		}
		case PATCH_USER_REQUEST: {
			return {
				...state,
				updateUserFailed: false,
				updateUserRequest: true
			};
		}
		case PATCH_USER_FAILED: {
			return {
				...state,
				updateUserFailed: true,
				updateUserRequest: false
			};
		}
		case PATCH_USER_SUCCESS: {
			return {
				...state,
				user: action.playload,
				form: {
					...state.form,
					email: '',
					password: '',
					name: ''
				},
				updateUserRequest: false,
				updateUserFailed: false,
			};
		}
		case UPDATE_TOKEN_REQUEST:
			return {
				...state,
				updateTokenRequest: true,
				updateTokenFailed: false,
			}
		case UPDATE_TOKEN_FAILED:
			return {
				...state,
				updateTokenRequest: false,
				updateTokenFailed: true,
			}
		case UPDATE_TOKEN_SUCCESS:
			return {
				...state,
				updateTokenRequest: false,
				updateTokenSuccess: true,
				updateTokenFailed: false,
			}
		default: {
			return state;
		}
	}
};
