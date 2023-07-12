import React from 'react';
import { useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import { HomePage, Register, Login, ForgotPassword, ResetPassword, Profile, IngredientDetailsPage, Feed, FeedInfoPage, Orders, OrderInfoPage } from '../../pages';
import {home, login, profile, feed, feedId, register, forgotPass, resetPass, profieOrders, profieOrdersId,  ingredientsId } from '../../utils/constants';
import appStyles from '../app/app.module.css';
import { getDataIngredients } from '../../services/actions/data';
import { checkUserAuth } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import IngredientDetails from "../ingredient-details/ingredient-details";
import { OrderInfo } from '../order-info/order-info';
import Modal from "../modal/modal";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const closeModalIngredientDetails = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getDataIngredients());
  }, [dispatch]);

  return (
    <div>
      <header className={ appStyles.header }>
        <AppHeader />
      </header>
        <Routes location={background || location}>
          <Route path={home} element={<HomePage />} />
          <Route path={register}  element={<OnlyUnAuth component={<Register />} />} />
          <Route path={login} element={<OnlyUnAuth component={<Login />} />} />
          <Route path={forgotPass} element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path={resetPass} element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path={profile} element={<OnlyAuth component={<Profile />} />} />
          <Route path={ingredientsId} element={<IngredientDetailsPage />} />
          <Route path={feed} element={<Feed />} />
          <Route path={feedId} element={<FeedInfoPage />} />
          <Route path={profieOrders} element={<OnlyAuth component={<Orders />} />} />
          <Route path={profieOrdersId} element={<OnlyAuth component={<OrderInfoPage />} />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  onClose={closeModalIngredientDetails}
                  title="Детали ингредиента"
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        {background && (
          <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal
                onClose={closeModalIngredientDetails}
                title=""
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
        )}
        {background && (
          <Routes>
          <Route
            path="/profile/orders/:id"
            element=
            {<OnlyAuth component={
              <Modal
              onClose={closeModalIngredientDetails}
              title="">
                <OrderInfo />
              </Modal>
            } />}
          />
        </Routes>
        )}
    </div>


  );

};


export default React.memo(App);

