import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { resetPassFetch } from '../../api/api';
import styles from './reset-password.module.css';

export const ResetPassword = () => {
	const [isVisible, setVisible] = useState(false);
  const [userForm, setUserForm] = useState({password:'', token:''});

  const navigate = useNavigate();

	function onClick() {
    navigate('/login/', { replace: true });
  }

  const onChange = e => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value});
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    postPass();
    navigate('/login', { replace: true });
  };

  function postPass() {
    return resetPassFetch(userForm)
      .then((res) => {
        userForm.password = res;
        userForm.token = res;
        localStorage.removeItem("email");
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }

  if (!localStorage.getItem("email")) {
    return <Navigate to={'/forgot-password'} replace={true} />;
  }

	return (
		<div className={styles.container}>
      <form className={styles.form} onSubmit={onClickSubmit}>
        <h2 className={`${styles.title} text text_type_main-medium pb-3`}>
          Восстановление пароля
        </h2>
        <fieldset className={`${styles.input_items} pb-3 pt-3`}>
          <Input
            type={isVisible ? "text" : "password"}
            placeholder={"Введите новый пароль"}
            onChange={onChange}
            icon={isVisible ? "ShowIcon" : "HideIcon"}
            onIconClick={() => setVisible(!isVisible)}
            value={userForm.password}
            name={"password"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}

          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={onChange}
            value={userForm.token}
            name={"token"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}

          />
        </fieldset>
        <div className={`${styles.button} pt-3 mb-15`}>
          <Button htmlType="submit" type="primary" size="medium" onSubmit={onClickSubmit}>
            Сохранить
          </Button>
        </div>
      </form>
      <div className={`${styles.text_container}`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
        </p>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pr-2"
          onClick={onClick}
        >
          Войти
        </Button>
      </div>
    </div>
  );
}
