import { useState, useEffect, useReducer } from 'react';
import AppHeader from '../appheader/appheader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css';
import { getDataIngredientsFetch } from '../../api/api.js';
import { DataContext, OrderContext } from '../services/IngredientsContext';
//import { data } from '../../utils/data';

const initialOrderState = {
  orderIngredients: []
};

function reducer(state, action) {
  switch (action.type) {
    case "setIngedients":
      return { orderIngredients: action.payload };
    case "addIngedient":
      return { orderIngredients: action.payload };
    case "removeIngredient":
      return { orderIngredients: action.payload };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const App = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [orderState, orderDispatcher] = useReducer(reducer, initialOrderState);


  const getDataIngredients = () => {
    setLoad(true);
    getDataIngredientsFetch()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoad(false))
  };

  useEffect(() => {
      getDataIngredients();
    }, []);

  return (

    <div>
      <header className={ appStyles.header }>
        <AppHeader />
      </header>
      <main className={ appStyles.main }>
        {load && <p>Loading...........</p>}
        <DataContext.Provider value={{ data, setData }}>
          <OrderContext.Provider value={{ orderState, orderDispatcher }}>
          <section className={ appStyles.section }>
            {!load && data.length && (<BurgersIngredients />)}
          </section>
          <section className={ `${ appStyles.section } mt-25 pr-4 pl-4` }>
            {!load && data.length && (<BurgerConstructor />)}
          </section>
          </OrderContext.Provider>
        </DataContext.Provider>
      </main>
    </div>

  );

};


export default App;
