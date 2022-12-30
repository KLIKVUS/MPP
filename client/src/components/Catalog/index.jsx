import React from "react";
import "./style.css";

const Catalog = () => {
    return (
        <section className="catalog">
            <div className="catalog__card">
                <img className="catalog__img" src="" alt="Картинка товара" />
                <h3 className="catalog__title">Название товара</h3>
                <p className="catalog__text">Цена товара</p>
            </div>
            <div className="catalog__card">
                <img className="catalog__img" src="" alt="Картинка товара" />
                <h3 className="catalog__title">Название товара</h3>
                <p className="catalog__text">Цена товара</p>
            </div>
            <div className="catalog__card">
                <img className="catalog__img" src="" alt="Картинка товара" />
                <h3 className="catalog__title">Название товара</h3>
                <p className="catalog__text">Цена товара</p>
            </div>
            <div className="catalog__card">
                <img className="catalog__img" src="" alt="Картинка товара" />
                <h3 className="catalog__title">Название товара</h3>
                <p className="catalog__text">Цена товара</p>
            </div>
        </section>
    );
};

export default Catalog;