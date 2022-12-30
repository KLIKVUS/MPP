import React from "react";
import "./style.css";

const SubMenu = ({ title, items, active }) => {
    return (
        <ul className={title === active ?  "header__sublist" : "header__sublist header__sublist--hidden"}>
            <li className="header__item">
                <h3 className="header__sublist-title" type="submit">
                    {title}
                </h3>
            </li>

            {items.map((item, index) => {
                return <li key={index} className="header__item">
                    <button className="header__link" type="submit">
                        {item}
                    </button>
                </li>
            })}

        </ul>
    );
};

export default SubMenu;