import React, { useState } from "react";
import "./style.css";
import { Link } from 'react-router-dom';
import SubMenu from "../SubMenu";

const Header = () => {
    const [isMenu, setMenu] = useState(false);
    const [hoverTitle, setHoverTitle] = useState('');

    return (
        <header className="header">
            <div className="header__wrapper">
                <button onClick={() => setMenu(!isMenu)} className="header__btn">Каталог</button>
                <Link to="/">
                    <img src="../img/wb-logo.svg" alt="Логотип" />
                </Link>
            </div>
            <nav className={isMenu ? "header__nav" : "header__nav header__nav--hidden"}>
                <button onClick={() => {
                    setMenu(!isMenu);
                    setHoverTitle('');
                    }} className="header__btn-close">
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 2.31643L20.6836 0L11.5 9.18357L2.31643 0L0 2.31643L9.18357 11.5L0 20.6836L2.31643 23L11.5 13.8164L20.6836 23L23 20.6836L13.8164 11.5L23 2.31643Z" fill="black" />
                    </svg>
                </button>
                <ul className="header__list">
                    <li className="header__item">
                        <button onMouseOver={function(evt) {setHoverTitle(evt.target.textContent);}} className="header__link" type="submit">
                            Женщинам
                        </button>
                        <SubMenu title={'Женщинам'} items={['Футболки','Футболки','Футболки','Футболки']} active={hoverTitle} />
                    </li>
                    <li className="header__item">
                        <button onMouseOver={function(evt) {setHoverTitle(evt.target.textContent);}} className="header__link" type="submit">
                            Мужчинам
                        </button>
                        <SubMenu title={'Мужчинам'} items={['Футболки','Футболки','Футболки','Футболки']} active={hoverTitle} />
                    </li>
                    <li className="header__item">
                        <button className="header__link" type="submit">
                            Новый год
                        </button>
                    </li>
                    <li className="header__item">
                        <button className="header__link" type="submit">
                            Трусы
                        </button>
                    </li>
                    <li className="header__item">
                        <button className="header__link" type="submit">
                            Женщинам
                        </button>
                    </li>
                    <li className="header__item">
                        <button className="header__link" type="submit">
                            Мужчинам
                        </button>
                    </li>
                    <li className="header__item">
                        <button className="header__link" type="submit">
                            Новый год
                        </button>
                    </li>
                    <li className="header__item">
                        <button className="header__link" type="submit">
                            Трусы
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;