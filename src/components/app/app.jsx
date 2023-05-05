import React from 'react';
import { useState, useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css';
import { getDataIngredientsFetch } from '../../api/api.js';
//import { data } from '../../utils/data';

const App = () => {
  const [dataIngredients, setDataIngredients] = useState([]);

  useEffect(() => {
    getDataIngredientsFetch()
      .then((res) => {
        console.log(res.data);
        setDataIngredients(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    <div>
      <header className={ appStyles.header }>
        <AppHeader />
      </header>
      <main className={ appStyles.main }>
        <section className={ appStyles.section }>
          <BurgersIngredients ingredients={ dataIngredients } />
        </section>
        <section className={ `${ appStyles.section } mt-25 pr-4 pl-4` }>
          <BurgerConstructor ingredients={ dataIngredients } />
        </section>
      </main>
    </div>

  );

};

export default App;
