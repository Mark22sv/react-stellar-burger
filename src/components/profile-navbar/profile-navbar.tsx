import styles from "./profile-navbar.module.css";
import { useMatch, NavLink  } from "react-router-dom";
import { signOut } from "../../services/actions/user";
import { profile, profieOrders, home } from '../../utils/constants';
import { useAppDispatch } from "../../services";
import { Style } from "../../services/types/data";


export function ProfileNavBar() {
  const dispatch = useAppDispatch();

  const profileLink = useMatch(profile);
  const profileOrdersLink = useMatch(profieOrders);

  const onClickOut = () => {
    dispatch(signOut());
  };

  const style = ( isActive: Style ) =>
  isActive
    ? `${styles.nav_link} ${styles.nav_link_active} text text_type_main-medium`
    : `${styles.nav_link} text text_type_main-medium text_color_inactive`;

  return (
    <div className={`${styles.text_container_nav}`}>
      <nav className={`${styles.text_container_list} pb-5`}>
        <NavLink
          to={{ pathname: profile }}
          className={profileLink ? style : style({isActive: false})}>
            Профиль
        </NavLink>
        <NavLink
          to={{ pathname: profieOrders }}
          className={profileOrdersLink ? style : style({isActive: false})}>
            История заказов
        </NavLink>
        <NavLink
          to={{ pathname: home }}
          className={style({isActive: false})}
          onClick={onClickOut}>
            Выход
        </NavLink>
      </nav>

      <p className="text text_type_main-default text_color_inactive pt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
