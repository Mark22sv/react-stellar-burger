import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { shallowEqual } from 'react-redux';
import BurgersIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import styles from './home.module.css';
import { useAppSelector } from '../../services';

export function HomePage() {
  const { dataRequest, dataFailed } = useAppSelector((state) => state.dataIngredients, shallowEqual);

  return (
    <div className={ styles.main }>
        {dataRequest && <p>Loading...........</p>}
          <DndProvider backend={ HTML5Backend }>
            <section className={ styles.section }>
              {!dataFailed && <BurgersIngredients />}
            </section>
            <section className={ `${ styles.section } mt-25 pr-4 pl-4` }>
              {!dataFailed && <BurgerConstructor />}
            </section>
          </DndProvider>
      </div>
  );
}
