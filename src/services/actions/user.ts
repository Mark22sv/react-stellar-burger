import { resgisterUserFetch, signInFetch, signOutFetch, getUserFetch, updateUserFetch } from '../../api/api';
import { User } from '../types/data';

export const SET_USER_REQUEST: 'SET_USER_REQUEST' = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS: 'SET_USER_SUCCESS' = 'SET_USER_SUCCESS';
export const SET_USER_FAILED: 'SET_USER_FAILED' = 'SET_USER_FAILED';

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED';

export const SIGNIN_USER_REQUEST: 'SIGNIN_USER_REQUEST' = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS: 'SIGNIN_USER_SUCCESS' = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILED: 'SIGNIN_USER_FAILED' = 'SIGNIN_USER_FAILED';

export const SIGNOUT_USER_REQUEST: 'SIGNOUT_USER_REQUEST' = 'SIGNOUT_USER_REQUEST';
export const SIGNOUT_USER_SUCCESS: 'SIGNOUT_USER_SUCCESS' = 'SIGNOUT_USER_SUCCESS';
export const SIGNOUT_USER_FAILED: 'SIGNOUT_USER_FAILED' = 'SIGNOUT_USER_FAILED';

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";

type SetUserRequest = {
  readonly type: typeof SET_USER_REQUEST;
};

type SetUserSuccess = {
  readonly type: typeof SET_USER_SUCCESS;
  user?: User;
};

type SetUserFailed = {
  readonly type: typeof SET_USER_FAILED;
};

type UpdateUserRequest = {
  readonly type: typeof UPDATE_USER_REQUEST;
};

type UpdateUserSuccess = {
  readonly type: typeof UPDATE_USER_SUCCESS;
  user?: User;
};

type UpdateUserFailed = {
  readonly type: typeof UPDATE_USER_FAILED;
};

type SignInUserRequest = {
  readonly type: typeof SIGNIN_USER_REQUEST;
};

type SignInUserSuccess = {
  readonly type: typeof SIGNIN_USER_SUCCESS;
  user?: User;
};

type SignInUserFailed = {
  readonly type: typeof SIGNIN_USER_FAILED;
};


type SignOutUserRequest = {
  readonly type: typeof SIGNOUT_USER_REQUEST;
};

type SignOutUserSuccess = {
  readonly type: typeof SIGNOUT_USER_SUCCESS;
  user?: User;
};

type SignOutUserFailed = {
  readonly type: typeof SIGNOUT_USER_FAILED;
};

type SetAuthChecked = {
  readonly type: typeof SET_AUTH_CHECKED;
  payload?: boolean;
};

type SetUser = {
  readonly type: typeof SET_USER;
  payload: User | null;
};

export type UserActions =
| SetUserRequest
| SetUserSuccess
| SetUserFailed
| UpdateUserRequest
| UpdateUserSuccess
| UpdateUserFailed
| SignInUserRequest
| SignInUserSuccess
| SignInUserFailed
| SignOutUserRequest
| SignOutUserSuccess
| SignOutUserFailed
| SetUser
| SetAuthChecked


export const setAuthChecked = (value: boolean): SetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

const setUserRequest = (): SetUserRequest => {
  return {
    type: SET_USER_REQUEST,
  }
};

const setUserSuccess = (user: User): SetUserSuccess => {
  return {
    type: SET_USER_SUCCESS,
    user
  }
};

const setUserFailed = (): SetUserFailed => {
  return {
    type:SET_USER_FAILED,
  }
};

const updateUserRequest = (): UpdateUserRequest => {
  return {
    type: UPDATE_USER_REQUEST,
  }
};

const updatetUserSuccess = (user: User): UpdateUserSuccess => {
  return {
    type: UPDATE_USER_SUCCESS,
    user
  }
};

const updatetUserFailed = (): UpdateUserFailed => {
  return {
    type: UPDATE_USER_FAILED,
  }
};

const signInUserRequest = (): SignInUserRequest => {
  return {
    type: SIGNIN_USER_REQUEST,
  }
};

const signInUserSuccess = (user: User): SignInUserSuccess => {
  return {
    type: SIGNIN_USER_SUCCESS,
    user
  }
};

const signInUserFailed = (): SignInUserFailed => {
  return {
    type: SIGNIN_USER_FAILED,
  }
};

const signOutUserRequest = (): SignOutUserRequest => {
  return {
    type: SIGNOUT_USER_REQUEST,
  }
};

const signOutUserSuccess = (): SignOutUserSuccess => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

const signOutUserFailed = (): SignOutUserFailed => {
  return {
    type: SIGNOUT_USER_FAILED,
  }
};

export function registerUser({email, password, name}: User) {
	return function (dispatch) {
		dispatch(setUserRequest());
		resgisterUserFetch(email, password, name)
			.then((res) => {
				dispatch(setUserSuccess(res.user));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
			})
			.catch(() => {
				dispatch(setUserFailed());
			})
	};
};

export const updateUser = ({email, password, name}: User) => {
  return function (dispatch) {
    dispatch(updateUserRequest())
    updateUserFetch(email, password, name)
      .then((res) => {
        if (res && res.success) {
          dispatch(updatetUserSuccess(res.user))
        } else {
            dispatch(updatetUserFailed())
        }
      }).catch(err => {
          dispatch(updatetUserFailed())

      });
  }
};

export function signIn({email, password}: User) {
	return function (dispatch) {
		dispatch(signInUserRequest());
		signInFetch(email, password)
			.then((res) => {
				dispatch(signInUserSuccess(res.user));
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
			})
			.catch(() => {
				dispatch(signInUserFailed());
			})
	};
};

export const signOut = () => {
  return function (dispatch) {
    dispatch(signOutUserRequest())
    signOutFetch()
      .then(res => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(signOutUserSuccess());
        } else {
          dispatch(signInUserFailed())
        }
      }).catch(err => {
         dispatch(signOutUserFailed())
      })

  };
}

export const setUser = (user: User | null): SetUser => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return function (dispatch) {
    return getUserFetch()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  }
};

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
        dispatch(getUser())
          .catch(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
          })
          .finally(() => dispatch(setAuthChecked(true)));
    } else {
        dispatch(setAuthChecked(true));
    }
  };
};