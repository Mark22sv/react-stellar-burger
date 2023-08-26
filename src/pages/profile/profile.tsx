import styles from "../profile/profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, FormEventHandler, SyntheticEvent } from "react";
import { useMatch  } from "react-router-dom";
import { ProfileNavBar } from '../../components/profile-navbar/profile-navbar';
import { updateUser } from "../../services/actions/user";
import { profile } from '../../utils/constants';
import { useForm } from "../../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../../services";

export function Profile() {
  const user = useAppSelector(
    (store) => store.auth.user
  );
  const userName: string =  user? user.name : '';
  const emailUser: string =  user? user.email : '';

  const { values, onChange, setValues } = useForm({
    name: userName,
    email: emailUser,
    password: '',
  });

  const [isEditing, setEditing] = useState({
    name: false,
    email: false,
    password: false,
  });

  const dispatch = useAppDispatch();
  const inputNameRef = useRef(null);
  const inputEmailRef = useRef(null);
  const inputPasswordRef = useRef(null);

  const profileLink = useMatch(profile);

  const onClickSave: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(updateUser(values));
  }

  function onClickCancel(e: SyntheticEvent<Element, Event>) {
    e.preventDefault();
    setValues({ name: userName, email: emailUser, password: "" });
  }

  const onChangeInput =
  values.name !== user?.name || values.email !== user?.email || values.password;

  return (
    <div className={styles.container}>
      <ProfileNavBar />
      {!!profileLink ? (
        <form className={styles.form} onSubmit={onClickSave}>
          <fieldset className={`${styles.input_items} pb-3`}>
            <Input
              type={"text"}
              placeholder={"Имя"}
              onChange={onChange}
              icon={values.name ? "EditIcon" : "CloseIcon"}
              onIconClick={() => setEditing({name: !false,
                email: !false,
                password: !false})}
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
              onIconClick={() => setEditing({name: !false,
                email: !false,
                password: !false})}
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
              onIconClick={() => setEditing({name: !false,
                email: !false,
                password: !false})}
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



