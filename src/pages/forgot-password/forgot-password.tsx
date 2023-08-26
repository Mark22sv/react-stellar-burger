import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postMailFetch } from '../../api/api';
import styles from './forgot-password.module.css';
import { login, resetPass } from '../../utils/constants';
import { useForm } from '../../hooks/useForm';

export const ForgotPassword = () => {
	const { values, onChange } = useForm({email: ''});
  const navigate = useNavigate();


  function postMail() {
    return postMailFetch(values.email)
      .then(res => {
        values.email = res.pass_reset;
        localStorage.setItem('email', res.pass_reset);
        navigate(resetPass, {replace: true});
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
  };

	const onFormSubmit = (e: MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		postMail();

  };

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<EmailInput
            onChange={onChange}
            value={values.email}
            name={"email"}
            isIcon={false}
            placeholder={"Укажите e-mail"}
						size={'default'}
					/>
				</div>
				<Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
					Восстановить
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
				<Link className={styles.link} to={login}>Войти</Link>
			</p>
		</div >)
}
