import React from 'react';
import { useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import { HomePage, Register } from '../../pages';
import BurgersIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import appStyles from '../app/app.module.css';
import { getDataIngredients } from '../../services/actions/data';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getSelectorDataIngredients } from '../../utils/get-selector';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();
  const { dataRequest, dataFailed } = useSelector(getSelectorDataIngredients, shallowEqual);

  useEffect(() => {
    dispatch(getDataIngredients());
    }, [dispatch]);

  return (

    <div>
      <header className={ appStyles.header }>
        <AppHeader />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>

  );

};


export default React.memo(App);
