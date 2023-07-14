import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../../services/actions/user';
import styles from './login.module.css';
import { forgotPass, register } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
  const { values, onChange } = useForm({email:'', password:''});
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const onFormSubmit = e => {
		e.preventDefault();
    dispatch(signIn(values));
  }

  return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
        <EmailInput
            onChange={onChange}
            value={values.email}
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
            value={values.password}
            name={"password"}
            error={false}
            onIconClick={() => setVisible(!isVisible)}
            errorText={"Ошибка"}
            size={"default"}

          />
				</div>
				<Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
					Войти
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы — новый пользователь?
				<Link className={styles.link} to={register}>Зарегистрироваться</Link>
			</p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?
				<Link className={styles.link} to={forgotPass}>Восстановить пароль</Link>
			</p>
		</div >)
}
