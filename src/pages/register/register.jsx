import { Button,
         EmailInput,
         Input,
         PasswordInput
       } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { registerUser, setRegisterFormValue } from '../../services/actions/user';
import { getCookie } from '../../utils/get-cookie';
import styles from './register.module.css';

export const Register = () => {

  const dispatch = useDispatch();
	const location = useLocation();
	const cookie = getCookie('token');
	const { email, password, name } = useSelector(state => state.auth.form);

	const onChange = e => {
	  dispatch(setRegisterFormValue(e.target.name, e.target.value));
	}

	const onFormSubmit = e => {
		e.preventDefault();
		dispatch(registerUser(email, password, name));
	}

	// if (cookie) {
	// 	return (<Navigate to={location.state?.from || '/'} />);
	// }

  return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Регистрация</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={onChange}
						value={name}
						name={'name'}
						error={false}
						size={'default'}
					/>
				</div>
				<div className="pb-6">
					<EmailInput onChange={onChange} value={email} name={'email'} size="default" />
				</div>
				<div className="pb-6">
					<PasswordInput onChange={onChange} value={password} name={'password'} size="default" />
				</div>
				<Button type="primary" size="medium">
					Зарегистрироваться
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Уже зарегистрированы?
				<Link className={styles.link} to='/login'>Войти</Link>
			</p>
		</div >)
}
