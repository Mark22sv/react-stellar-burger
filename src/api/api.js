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

export { getDataIngredientsFetch, setOrderFetch };
