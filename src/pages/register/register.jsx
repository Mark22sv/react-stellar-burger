import { Button,
         EmailInput,
         Input,
         PasswordInput
       } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/actions/user';
import { home, login } from '../../utils/constants';
import styles from './register.module.css';
import { useForm } from '../../hooks/useForm';

export const Register = () => {
  const { values, onChange } = useForm({ name: "", email: "", password: "" });

  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

	const onFormSubmit = e => {
		e.preventDefault();
    navigate(home, { replace: true });
    dispatch(registerUser(values));

	}

  return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={onChange}
						value={values.name}
						name={'name'}
						error={false}
						size={'default'}
            errorText={"Ошибка"}
					/>
				</div>
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
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onFormSubmit}
        >
					Зарегистрироваться
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы?
				<Link className={styles.link} to={login}>Войти</Link>
			</p>
		</div >)
}
