import { getDataIngredientsFetch } from '../../api/api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const RESET_SELECTED_INGREDIENT ='RESET_SELECTED_INGREDIENT';

export const getDataIngredients = () => {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getDataIngredientsFetch()
      .then(res =>
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        })
      )
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
        console.log(error);
      });
  };
};

