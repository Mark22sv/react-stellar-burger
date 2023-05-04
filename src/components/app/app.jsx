import React from 'react';
import AppHeader from '../appheader/appheader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css'
import {data} from '../utils/data'

const App = () => {
  const [dataIngredients, setDataIngredients] = React.useState(data);
  // state = {
  //   data
  // };
console.log(data)

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
