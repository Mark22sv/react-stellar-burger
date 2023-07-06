import React from 'react';
import { useEffect } from 'react';
import AppHeader from '../appheader/appheader';
import { HomePage, Register, Login, ForgotPassword, ResetPassword, Profile, IngredientDetailsPage, Feed, Orders } from '../../pages';
import appStyles from '../app/app.module.css';
import { getDataIngredients } from '../../services/actions/data';
import { checkUserAuth } from '../../services/actions/user';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import IngredientDetails from "../ingredient-details/ingredient-details";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/register"  element={<OnlyUnAuth component={<Register />} />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile/orders" element={<Orders />} />
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

    </div>

  );

};


export default React.memo(App);

// {/* <Route path="/register"  element={<OnlyUnAuth component={<Register />} />} />
//           <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
//           <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
//          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
//           <Route path="/profile" element={<OnlyAuth component={<Profile />} />} /> */}
// {/* <Route path="/" element={<HomePage />} />
//           <Route path="/register"  element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />
//           <Route path="/profile" element={<Profile />} /> */}
