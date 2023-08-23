import { GET_INGREDIENTS_REQUEST,
         GET_INGREDIENTS_SUCCESS,
         GET_INGREDIENTS_FAILED,
         DataActions
        } from '../actions/data';
import { Ingredient } from '../types/data';

export type DataState = {
  data: Ingredient[];
  dataRequest: Boolean;
  dataFailed: Boolean;
};

const initialState: DataState = {
  data: [],
  dataRequest: false,
  dataFailed: false,
};

export const dataReducer = (state = initialState, action: DataActions): DataState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        dataRequest: true,
        dataFailed: false
      };

    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        data: action.data,
        dataRequest: false
      };

    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        data: [],
        dataFailed: true,
        dataRequest: false
      };

    default:
      return state;

  }
}

