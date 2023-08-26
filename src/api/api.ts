import { IngredientsResponse, Headers, User, ResponseBody, RefreshData, OrderResponse, UserResponse, LoginResponse, OrderIngredient, PostResetPassObj, UserLogin } from "../services/types/data";

const url: string = 'https://norma.nomoreparties.space/api';


const checksAnswer = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}


const getDataIngredientsFetch = () => {
  return fetch(`${url}/ingredients`,
  {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    } as (HeadersInit | undefined) & Headers
  })
  .then((res) => checksAnswer<IngredientsResponse>(res))

};

const getOrderIngredientsFetch = (number: number) => {
  return fetch(`${url}/orders/${number}`,
  {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    } as (HeadersInit | undefined) & Headers
  })
  .then((res) => checksAnswer<ResponseBody<'orders', OrderIngredient[]>>(res))

};

const setOrderFetch = async (order: string[]) => {
  return await fetch (`${url}/orders`,
    {
      method: "POST",
      headers:{
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken')
      } as (HeadersInit | undefined) & Headers,
      body: JSON.stringify({ingredients: order})
    })
    .then(res => checksAnswer<OrderResponse>(res))
  };


const postMailFetch = (email: string): Promise<ResponseBody<'pass_reset', string>> => {
  return fetch(`${url}/password-reset`, {
    method: "POST",
    headers: {
			'Content-Type': 'application/json',
		} as (HeadersInit | undefined) & Headers,
    body: JSON.stringify({
      email,
    }),
  })
  .then((res) => checksAnswer(res))
};

const resetPassFetch = (obj: PostResetPassObj): Promise<ResponseBody<'reset_password', string>> => {
  return fetch(`${url}/password-reset/reset`, {
    method: "POST",
    headers: {
			'Content-Type': 'application/json',
		} as (HeadersInit | undefined) & Headers,
    body: JSON.stringify(
      obj
    ),
  })
  .then((res) => checksAnswer(res))
};

const signInFetch = async ({email, password}: UserLogin): Promise<ResponseBody<'user', Readonly<User>>> => {
	return await fetch(`${url}/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		} as (HeadersInit | undefined) & Headers,
		body: JSON.stringify({
			email, password
		}),
	})
  .then((res) => checksAnswer<LoginResponse>(res))

};

const signOutFetch = async () => {
  return await fetchWithRefresh(`auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    } as (HeadersInit | undefined) & Headers,
    body: JSON.stringify({
    token: localStorage.getItem("refreshToken"),
    }),
  })
};

const resgisterUserFetch = async (email: string, password: string, name: string) => {
	return await fetch(`${url}/auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name
		}),
		headers: {
			'Content-Type': 'application/json',
		} as (HeadersInit | undefined) & Headers,
	})
  .then((res) => checksAnswer<UserResponse>(res))
};

const updateUserFetch = async (email: string, password: string, name: string) => {
  return fetch(`${url}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken')
    } as (HeadersInit | undefined) & Headers,
    body: JSON.stringify({
      name, email, password
    }),
  })
  .then((res) => checksAnswer<UserResponse>(res))
};

const getUserFetch = () => {
  return fetchWithRefresh('auth/user', {
    method: "GET",
    headers: {
      authorization: localStorage.getItem('accessToken'),
      "Content-Type": "application/json;charset=utf-8",
    } as (HeadersInit | undefined) & Headers,
  })
};

export const refreshToken = async () => {
  return await fetch(`${url}/auth/token`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		} as (HeadersInit | undefined) & Headers,
		body: JSON.stringify({
			token: localStorage.getItem("refreshToken"),
		}),
  });
};


export const fetchWithRefresh = async (
  endpoint: string,
  options: RequestInit & { headers: { authorization: string | null, "Content-Type": string } }
): Promise<ResponseBody<'user', Readonly<User>>> => {
  try {
    const res = await fetch(`${url}/${endpoint}`, options);
    return await checksAnswer(res);
  } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = (await refreshToken()) as unknown as RefreshData; //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${url}/${endpoint}`, options); //повторяем запрос
      return await checksAnswer(res);
    } else {
      return Promise.reject(err);
    }
  }
};


export { getDataIngredientsFetch, setOrderFetch, signInFetch, resgisterUserFetch,  updateUserFetch, getUserFetch, postMailFetch, signOutFetch, resetPassFetch, getOrderIngredientsFetch };
