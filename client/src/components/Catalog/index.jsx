import React, { useEffect, useState } from "react";
import "./style.css";

const Catalog = ({ categoryUrl }) => {
    const [data, setData] = useState([]);
    const [isLoad, setLoad] = useState(false);
    const [isFilterClick, setFilterClick] = useState(false);

    useEffect(() => {
        fetch(`/products?${categoryUrl}`).then(res => res.json()).then(data => {
            setLoad(true);
            setData(data.data);
            localStorage.setItem("products", JSON.stringify(data.data.slice(0, 100)));
        })
    }, [categoryUrl]);

    const handleFilter = () => {
        const filteredProducts = data.slice(0, 100).sort((a, b) => {
            return a.price - b.price;
        });

        setFilterClick(!isFilterClick);
        setData(filteredProducts);  
    };

    const handleBackBtn = () => {
        const initialProducts = JSON.parse(localStorage.getItem("products"));
        setFilterClick(!isFilterClick);
        setData(initialProducts);
    };

    return (
        <section className="catalog">
            {
                !isFilterClick ? <button type="button" onClick={handleFilter}>Самые низкие цены</button> : 
                <button type="button" onClick={handleBackBtn}>Самые дорогие цены</button>
            }
            {
                data.length === 0 && <p>Тут ничего нет :(</p>
            }
            <div className="catalog__wrapper">
                {
                    isLoad && data.length !== 0 && data.slice(0, 100).map((item, index) => {
                        return (
                            <div key={index} className="catalog__card">
                                <h3 className="catalog__title">{item.name}</h3>
                                <p className="catalog__text">{item.price}₽</p>
                                <p className="catalog__brand">{item.brand}</p>
                                <span className="catalog__rating">{item.rating}/5</span>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};

export default Catalog;