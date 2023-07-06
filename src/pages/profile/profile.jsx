import styles from "../profile/profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useMatch, NavLink, Outlet  } from "react-router-dom";

import { signOut, updateUser } from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { profile, orders } from '../../utils/constants';
import { useForm } from "../../hooks/useForm";

export function Profile() {
  const { name, email } = useSelector(
    (state) => state.auth.user
  );
  const { values, onChange, setValues } = useForm({
    name: name,
    email: email,
    password: '',
  });
  const [isEditing, setEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const dispatch = useDispatch();
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const profileLink = useMatch(profile);
  const profileOrdersLink = useMatch(orders);

  const onClickOut = () => {
    dispatch(signOut());
  };

  const onClickSave = (e) => {
    e.preventDefault();
    dispatch(updateUser(values));
  }

  function onClickCancel(e) {
    e.preventDefault();
    setValues({ name, email, password: "" });
  }

  const onChangeInput =
  values.name !== name || values.email !== email || values.password;

  const style = ({ isActive }) =>
  isActive
    ? `${styles.nav_link} ${styles.nav_link_active} text text_type_main-medium`
    : `${styles.nav_link} text text_type_main-medium text_color_inactive`;

  return (
    <div className={styles.container_profile}>
      <div className={`${styles.text_container_nav}`}>
        <nav className={`${styles.text_container_list} pb-5`}>
        {profileLink ? (
            <NavLink to={{ pathname: profile }} className={style}>
              Профиль
            </NavLink>
          ) : (
            <NavLink to={{ pathname: profile }} className={style(false)}>
              Профиль
            </NavLink>
          )}
          {profileOrdersLink ? (
            <NavLink to={{ pathname: orders }} className={style}>
              История заказов
            </NavLink>
          ) : (
            <NavLink
              to={{ pathname: orders }}
              className={style(false)}
            >
              История заказов
            </NavLink>
          )}
          <NavLink className={style(false)} onClick={onClickOut}>
            Выход
          </NavLink>
        </nav>
        <Outlet />
        <p className="text text_type_main-default text_color_inactive pt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      {!!profileLink ? (
        <form className={styles.form} onSubmit={onClickSave}>
          <fieldset className={`${styles.input_items} pb-3`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              icon={values.name ? "EditIcon" : "CloseIcon"}
              onIconClick={() => setEditing(!isEditing)}
              value={values.name}
              name={"name"}
              error={false}
              ref={inputNameRef}
              errorText={"Ошибка"}
              size={"default"}
            />
            <Input
              type={"text"}
              placeholder={"E-mail"}
              onChange={onChange}
              icon={values.email ? "EditIcon" : "CloseIcon"}
              onIconClick={() => setEditing(!isEditing)}
              value={values.email}
              name={"email"}
              error={false}
              ref={inputEmailRef}
              errorText={"Ошибка"}
              size={"default"}
            />
            <Input
              type={"password"}
              placeholder={"Пароль"}
              onChange={onChange}
              icon={values.password ? "CloseIcon" : "EditIcon"}
              onIconClick={() => setEditing(!isEditing)}
              value={values.password}
              name={"password"}
              error={false}
              ref={inputPasswordRef}
              errorText={"Ошибка"}
              size={"default"}
            />
          </fieldset>
          {onChangeInput ? (
            <div className={`${styles.form_button_container} pt-3`}>
              <Button
                htmlType="button"
                type="secondary"
                size="medium"
                onClick={onClickCancel}
              >
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          ) : null}
        </form>
      ) : null}
    </div>
  );
}



