import { combineReducers } from 'redux';
import { dataReducer } from './data'
import { constructorIngredientsReducer } from './constructor-inrgedients';
import { orderReducer } from './order-details';

export const rootReducer = combineReducers({
  dataIngredients: dataReducer,
  constructorDataIngredients: constructorIngredientsReducer,
  order: orderReducer
});
