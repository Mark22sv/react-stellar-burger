import { getCookie } from "../utils/get-cookie";

const config = {
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
};

const checksAnswer = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`);
};

const getDataIngredientsFetch = () => {
  return fetch(`${config.url}/ingredients`,
  {
    method: "GET",
    headers: config.headers
  })
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
};

const setOrderFetch = (order) => {
  return fetch(`${config.url}/orders`,
  {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(order)
  })
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
};

const forgotPassRequest = async email => {
	return await fetch(`${config.url}/password-reset`, {
		method: 'POST',
		body: JSON.stringify(
			email
		),
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const resetPassRequest = async (password, token) => {
	return await fetch(`${config.url}/password-reset/reset`, {
		method: 'POST',
		body: JSON.stringify(
			password,
			token,
		),
		headers: {
			'Content-Type': 'application/json',
		},
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const loginRequest = async (email, password) => {
	return await fetch(`${config.url}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const resgisterUserRequest = async (email, password, name) => {
	return await fetch(`${config.url}/auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const logoutRequest = async () => {
	return await fetch(`${config.url}/auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const getUserRequest = async () => {
	return await fetch(`${config.url}auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const updateUserRequest = async (email, name, password) => {
	return await fetch(`${config.url}/auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			email: email,
			name: name,
			password: password,
		}),
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const updateTokenRequest = async () => {
	return await fetch(`${config.url}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}



export { getDataIngredientsFetch, setOrderFetch, forgotPassRequest, resetPassRequest, loginRequest, resgisterUserRequest, logoutRequest, getUserRequest, updateUserRequest, updateTokenRequest };
