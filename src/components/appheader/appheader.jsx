import React from 'react';
import headerStyle from './appheader.module.css'
import {Logo,
        BurgerIcon,
        ListIcon,
        ProfileIcon
       } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMatch, NavLink, Link } from 'react-router-dom';
import {home, profile, feed } from '../../utils/constants';

const AppHeader = () => {
  const styles = ({ isActive }) =>
    isActive
      ? `${headerStyle.header_link} ${headerStyle.header_link_active} text_type_main-default pl-2`
      : `${headerStyle.header_link} text_type_main-default text_color_inactive pl-2`;
  const homeLink = useMatch(home);
  const profileLink = useMatch(profile);
  const orderFeedLink = useMatch(feed);

  return (
    <header className={ `${headerStyle.header} pt-4 pb-4` }>
      <nav className={ headerStyle.nav }>
        <ul className={ headerStyle.list }>
          <li className={ `${headerStyle.link} pt-4 pb-4` }>
            <NavLink to={home} className={ styles }>
            {homeLink ? (
              <div className={ `${headerStyle.icon} ml-5 mr-4` }>
                <BurgerIcon type="primary" />
              </div>
             ) : (
              <div className={ `${headerStyle.icon} ml-5 mr-4` }>
                <BurgerIcon type="secondary" />
              </div>
             )}
             Конструктор
            </NavLink>
          </li>
          <li className={ `${headerStyle.link} pt-4 pb-4` }>
            <NavLink to={feed} className={ styles }>
            {orderFeedLink ? (
              <div className={ `${headerStyle.icon} ml-5 mr-4` }>
                <ListIcon type="primary" />
              </div>
            ) : (
              <div className={ `${headerStyle.icon} ml-5 mr-4` }>
                <ListIcon type="secondary" />
              </div>
            )}
            Лента заказов
            </NavLink>
          </li>
        </ul>
        <Link to={home} className={ styles }>
          <Logo />
        </Link>
        <NavLink to={profile} className={ styles }>
        {profileLink ? (
          <div className={ `${headerStyle.icon} ml-5 mr-4` }>
            <ProfileIcon type="primary" />
          </div>
        ) : (
          <div className={ `${headerStyle.icon} ml-5 mr-4` }>
            <ProfileIcon type="secondary" />
          </div>
        )}
        Личный кабинет
        </NavLink>
      </nav>

    </header>
  );

}

export default React.memo(AppHeader);
