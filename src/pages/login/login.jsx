import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../../services/actions/user';
import styles from './login.module.css';


export const Login = () => {
  const [userForm, setUserForm] = useState({email:'', password:''});
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onChange = e => {
    setUserForm({
      ...userForm,
      [e.target.name]:e.target.value});
  };

	const onFormSubmit = e => {
		e.preventDefault();
    dispatch(signIn(userForm));
  }

  return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
        <EmailInput
            onChange={onChange}
            value={userForm.email}
            name={'email'}
            size="default"
            placeholder="E-mail"

          />
				</div>
				<div className="pb-6">
        <PasswordInput
            type={isVisible ? 'text' : 'password'}
            placeholder={"Пароль"}
            onChange={onChange}
            icon={isVisible ? 'ShowIcon' : 'HideIcon'}
            value={userForm.password}
            name={"password"}
            error={false}
            onIconClick={() => setVisible(!isVisible)}
            errorText={"Ошибка"}
            size={"default"}

          />
				</div>
				<Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onFormSubmit}
        >
					Войти
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы — новый пользователь?
				<Link className={styles.link} to='/register'>Зарегистрироваться</Link>
			</p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?
				<Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</div >)
}
