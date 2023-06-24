import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { forgotPassword } from '../../services/actions/user';
import { getCookie } from '../../utils/get-cookie';
import styles from './forgot-password.module.css';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const location = useLocation();
	const cookie = getCookie('token');

	const { forgetPassSuccess } = useSelector(state => state.auth);

	const onChangeEmail = e => {
		setEmail(e.target.value);
	}

	const onFormSubmit = e => {
		e.preventDefault();
		dispatch(forgotPassword({ email }));
	}

	// if (cookie) {
	// 	return (<Navigate to={location.state?.from || '/'} />);
	// }

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<Input
						type={'email'}
						placeholder={'Укажите e-mail'}
						onChange={onChangeEmail}
						value={email}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<Button type="primary" size="medium">
					{!!forgetPassSuccess
						? (<Navigate to='/reset-password' />)
						: ''
					}
					Восстановить
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
				<Link className={styles.link} to='/login'>Войти</Link>
			</p>
		</div >)
}
