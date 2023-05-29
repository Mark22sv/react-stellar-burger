import { useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css';
import { getDataIngredients } from '../../services/actions/data';
import { useDispatch, useSelector } from 'react-redux';



const App = () => {
  const dispatch = useDispatch();
  const { dataRequest, dataFailed } = useSelector(state => state.dataIngredients);

  useEffect(() => {
    dispatch(getDataIngredients());
    }, [dispatch]);

  return (

    <div>
      <header className={ appStyles.header }>
        <AppHeader />
      </header>
      <main className={ appStyles.main }>
        {dataRequest && <p>Loading...........</p>}

          <section className={ appStyles.section }>
            {!dataFailed && <BurgersIngredients />}
          </section>
          <section className={ `${ appStyles.section } mt-25 pr-4 pl-4` }>
            {!dataFailed && <BurgerConstructor />}
          </section>

      </main>
    </div>

  );

};


export default App;
