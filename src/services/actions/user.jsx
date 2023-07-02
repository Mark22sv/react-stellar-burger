import { resgisterUserFetch, signInFetch, signOutFetch, getUserFetch, updateUserFetch } from '../../api/api';

export const SET_USER_REQUEST = 'SET_USER_REQUEST';
export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const SET_USER_FAILED = 'SET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const ADD_USER = 'ADD_USER';
export const RESET_USER = 'RESET_USER';

export const SIGNIN_USER_REQUEST = 'SIGNIN_USER_REQUEST';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILED = 'SIGNIN_USER_FAILED';

export const SIGNOUT_USER_REQUEST = 'SIGNOUT_USER_REQUEST';
export const SIGNOUT_USER_SUCCESS = 'SIGNOUT_USER_SUCCESS';
export const SIGNOUT_USER_FAILED = 'SIGNOUT_USER_FAILED';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export function registerUser({email, password, name}) {
	return function (dispatch) {
		dispatch({
			type: SIGNIN_USER_REQUEST,
		});
		resgisterUserFetch({email, password, name})
			.then((res) => {
				dispatch({
					type: SIGNIN_USER_SUCCESS,
					user: res,
				});
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
			})
			.catch(() => {
				dispatch({
					type: SIGNIN_USER_FAILED,
				});
			})
	};
};

export const updateUser = (form) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    })
    updateUserFetch(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            user: res
          })
        } else {
            dispatch({
            type: UPDATE_USER_FAILED
          })
        }
      }).catch(err => {
          dispatch({
          type: UPDATE_USER_FAILED
          })

      });
  }
};

export function signIn({email, password}) {
	return function (dispatch) {
		dispatch({
			type: SIGNIN_USER_REQUEST,
		});
		signInFetch({email, password})
			.then((res) => {
				dispatch({
					type: SIGNIN_USER_SUCCESS,
					user: res,
				});
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setAuthChecked(true));
			})
			.catch(() => {
				dispatch({
					type: SIGNIN_USER_FAILED,
				});
			})
	};
};

export const signOut = () => {
  return function (dispatch) {
    dispatch({
      type: SIGNOUT_USER_REQUEST
    })
    signOutFetch()
      .then(res => {
        if (res && res.success) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch({
            type: SIGNOUT_USER_SUCCESS,
          });
          dispatch(setAuthChecked(false));

        } else {
          dispatch({
            type: SIGNOUT_USER_FAILED
          })
        }
      }).catch(err => {
         dispatch({
          type: SIGNOUT_USER_FAILED
        })
      })

  };
}

export const getUser = () => {
  return function (dispatch) {
    return getUserFetch()
      .then((res) => {
        dispatch({
					type: ADD_USER,
					user: res,
				});
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
                dispatch({
                  type: RESET_USER,
                });
             })
            .finally(() => dispatch(setAuthChecked(true)));
      } else {
          dispatch(setAuthChecked(true));
      }
  };
};

