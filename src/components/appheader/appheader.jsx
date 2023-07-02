import React from 'react';
import headerStyle from './appheader.module.css'
import {Logo,
        BurgerIcon,
        ListIcon,
        ProfileIcon
       } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMatch, NavLink } from 'react-router-dom';

const AppHeader = () => {
  const styles = ({ isActive }) =>
    isActive
      ? `${headerStyle.header_link} ${headerStyle.header_link_active} text_type_main-default pl-2`
      : `${headerStyle.header_link} text_type_main-default  text_color_inactive pl-2`;
  const homeLink = useMatch("/");
  const profileLink = useMatch("/profile");
  const orderFeedLink = useMatch("/orders");

  return (
    <header className={ `${headerStyle.header} pt-4 pb-4` }>
      <nav className={ headerStyle.nav }>
        <ul className={ headerStyle.list }>
          <li className={ `${headerStyle.link} pt-4 pb-4` }>
            <NavLink to={'/'} className={ styles }>
            {homeLink ? (
              <div className={ `${headerStyle.icon} ml-5` }>
                <BurgerIcon type="primary" />
              </div>
             ) : (
              <div className={ `${headerStyle.icon} ml-5` }>
                <BurgerIcon type="secondary" />
              </div>
             )}
              <span className={`${ headerStyle.text } text text_type_main-default mr-5`}>Конструктор</span>
            </NavLink>
          </li>
          <li className={ `${headerStyle.link} pt-4 pb-4` }>
            <NavLink to={'/'} className={ styles }>
            {orderFeedLink ? (
              <div className={ `${headerStyle.icon} ml-5` }>
                <ListIcon type="primary" />
              </div>
            ) : (
              <div className={ `${headerStyle.icon} ml-5` }>
                <ListIcon type="secondary" />
              </div>
            )}
              <span className={`${ headerStyle.text } text text_type_main-default text_color_inactive mr-5`}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
        <Logo />
        <NavLink to='/profile' className={ `${headerStyle.link} pt-4 pb-4` }>
        {profileLink ? (
          <div className={ `${headerStyle.icon} ml-5` }>
            <ProfileIcon type="primary" />
          </div>
        ) : (
          <div className={ `${headerStyle.icon} ml-5` }>
            <ProfileIcon type="secondary" />
          </div>
        )}
          <span className={`${ headerStyle.text } text text_type_main-default text_color_inactive mr-5`}>Личный кабинет</span>
        </NavLink>
      </nav>

    </header>
  );

}

export default React.memo(AppHeader);
