const config = {
  url: 'https://norma.nomoreparties.space/api',
  headers: {
    'Content-Type': 'application/json'
  }
};

const checksAnswer = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
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
    headers:{
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(order)
  })
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
};

const postMailFetch = async (email) => {
  return await fetch(`${config.url}/password-reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
    })
	});
};

const resetPassFetch = async ({ password, token }) => {
  return await fetch(`${config.url}/password-reset/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			password, token
    }),
	});
}

const signInFetch = async ({email, password}) => {
	return await fetch(`${config.url}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email, password,
		}),
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const signOutFetch = async () => {
  return await fetchWithRefresh(`auth/logout`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json',
    authorization: localStorage.getItem('accessToken') },
    body: JSON.stringify({
    token: localStorage.getItem("refreshToken"),
	  }),
  })
}

const resgisterUserFetch = async ({email, password, name}) => {
	return await fetch(`${config.url}/auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
}

const updateUserFetch = async ({email, name, password}) => {
  return fetch(`${config.url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      name, email, password
    }),
  })
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
};

const getUserFetch = () => {
  return fetchWithRefresh('auth/user', {
    method: "GET",
    headers: {
      authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json;charset=utf-8",
    },
  })
};

export const refreshToken = async () => {
  return await fetch(`${config.url}/auth/token`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify({
			token: localStorage.getItem("refreshToken"),
		}),
  });
};


export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${config.url}/${endpoint}`, options);
    return await checksAnswer(res);
  } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${config.url}/${endpoint}`, options); //повторяем запрос
      return await checksAnswer(res);
    } else {
      return Promise.reject(err);
    }
  }
};


export { getDataIngredientsFetch, setOrderFetch, signInFetch, resgisterUserFetch,  updateUserFetch, getUserFetch, postMailFetch, signOutFetch, resetPassFetch };
