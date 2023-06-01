import { useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css';
import { getDataIngredients } from '../../services/actions/data';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


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
          <DndProvider backend={ HTML5Backend }>
            <section className={ appStyles.section }>
              {!dataFailed && <BurgersIngredients />}
            </section>
            <section className={ `${ appStyles.section } mt-25 pr-4 pl-4` }>
              {!dataFailed && <BurgerConstructor />}
            </section>
          </DndProvider>
      </main>
    </div>

  );

};


export default App;
