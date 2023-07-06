import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postMailFetch } from '../../api/api';
import styles from './forgot-password.module.css';
import { login, resetPass } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword = () => {
	const [ values, onChangeEmail] = useForm({email: ''});
  const navigate = useNavigate();


  function postMail() {
    return postMailFetch(values.email)
      .then(res => {
        values.email = res.email;
        localStorage.setItem('email', res.email);
        navigate(resetPass, {replace: true});
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  };

	const onFormSubmit = e => {
		e.preventDefault();
		postMail();

  };

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<EmailInput
            onChange={onChangeEmail}
            value={values.email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={onFormSubmit}
        >
					Восстановить
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
				<Link className={styles.link} to={login}>Войти</Link>
			</p>
		</div >)
}
