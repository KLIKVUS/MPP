import React from "react";
import "./style.css";
import browserHistory from "../../browser-history";

const SubMenu = ({ isMenu, setMenu, setCategoryUrl, title, items, active }) => {
    return (
        <ul className={title === active ? "header__sublist" : "header__sublist header__sublist--hidden"}>
            <li className="header__item">
                <h3 className="header__sublist-title" type="submit">
                    {title}
                </h3>
            </li>

            {items.map((item, index) => {
                return <li key={index} className="header__item">
                    <button onClick={() => {
                        setCategoryUrl(item.query);
                        localStorage.setItem("categoryUrl", item.query)
                        browserHistory.push(item.url);
                        setMenu(!isMenu);
                    }} className="header__link" type="submit">
                        {item.name}
                    </button>
                </li>
            })}

        </ul>
    );
};

export default SubMenu;