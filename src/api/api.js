const config = {
  url: `https://norma.nomoreparties.space/api/ingredients`,
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
  return fetch(`${config.url}`,
  {
    method: "GET",
    headers: config.headers
  })
  .then((res) => checksAnswer(res))
  .catch((error) => console.log(error));
};

export {getDataIngredientsFetch};
