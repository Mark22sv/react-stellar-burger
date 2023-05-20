import { useState, useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css';
import { getDataIngredientsFetch } from '../../api/api.js';
import { DataContext, IngredientsContext } from '../services/IngredientsContext';
//import { data } from '../../utils/data';

const App = () => {
  const [data, setData] = useState([]);
  const [dataIngredients, setDataIngredients] = useState([]);

  const getDataIngredients = () => {
    getDataIngredientsFetch()
      .then((res) => {
        setData(res.data);
        setDataIngredients(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
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
        <DataContext.Provider value={{ data, setData }}>
        <IngredientsContext.Provider value={{ dataIngredients, setDataIngredients }}>
          <section className={ appStyles.section }>
            {dataIngredients.length && (<BurgersIngredients />)}
          </section>
          <section className={ `${ appStyles.section } mt-25 pr-4 pl-4` }>
            {dataIngredients.length && (<BurgerConstructor />)}
          </section>
        </IngredientsContext.Provider>
        </DataContext.Provider>
      </main>
    </div>

  );

};

export default App;
