import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSelectorDataIngredients } from '../utils/get-selector';
import { useSelector, shallowEqual } from 'react-redux';
import BurgersIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import styles from './home.module.css';

export function HomePage() {
  const { dataRequest, dataFailed } = useSelector(getSelectorDataIngredients, shallowEqual);
  return (
    <main className={ styles.main }>
        {dataRequest && <p>Loading...........</p>}
          <DndProvider backend={ HTML5Backend }>
            <section className={ styles.section }>
              {!dataFailed && <BurgersIngredients />}
            </section>
            <section className={ `${ styles.section } mt-25 pr-4 pl-4` }>
              {!dataFailed && <BurgerConstructor />}
            </section>
          </DndProvider>
      </main>
  );
}
