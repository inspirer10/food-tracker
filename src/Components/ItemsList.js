import React, { useEffect, useState } from 'react';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
import { SlList, SlGrid } from 'react-icons/sl';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, setProducts } from '../redux/products';

function ItemsList() {
    const dispatch = useDispatch();
    const { nightMode } = useSelector((state) => state.nightMode);
    const { products } = useSelector((state) => state.products);
    const [expirationSorted, setCathegorySorted] = useState(true);
    const [listView, setListView] = useState(true);

    console.log(products);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000');
            const json = await response.json();
            dispatch(setProducts(json));
            //console.log(json);
        };
        fetchProducts();
    }, []);

    function countExpirationDays(expirationDate) {
        const expired = <span className='expired'>Expired !</span>;
        const expiringToday = <span className='expired'>Today !</span>;
        const todaysDate = new Date();
        let productDate = new Date(expirationDate);
        let difference = productDate.getTime() - todaysDate.getTime();
        let days = Math.ceil(difference / (1000 * 3600 * 24));

        if (days < 0) {
            return expired;
        } else if (days === 0) {
            return expiringToday;
        }
        return days <= 1 ? `${days} day` : `${days} days`;
    }

    function showProductDate(expirationDate) {
        let date = new Date(expirationDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        switch (month) {
            case 1:
                month = 'Jan';
                break;
            case 2:
                month = 'Feb';
                break;
            case 3:
                month = 'Mar';
                break;
            case 4:
                month = 'Apr';
                break;
            case 5:
                month = 'May';
                break;
            case 6:
                month = 'Jun';
                break;
            case 7:
                month = 'Jul';
                break;
            case 8:
                month = 'Aug';
                break;
            case 9:
                month = 'Sep';
                break;
            case 10:
                month = 'Oct';
                break;
            case 11:
                month = 'Nov';
                break;
            case 12:
                month = 'Dec';
                break;
            default:
                break;
        }
        let dateFormat = `${day} ${month} ${year}`;
        return dateFormat;
    }

    const handleDeleteProduct = async (id, _id) => {
        const response = await fetch('http://localhost:5000/' + _id, {
            method: 'DELETE',
        });
        const json = await response.json();
        console.warn(json);

        console.info(id + ' z mongoDB: ' + _id);
        if (response.ok) {
            dispatch(removeProduct(json));
        }
    };

    const [sortedProducts, setSortedProducts] = useState([]);
    // Sortowanie produktów, gdy expirationSorted się zmienia
    useEffect(() => {
        let sorted = [...products];
        if (expirationSorted === true) {
            sorted.sort((a, b) => {
                let dateA = new Date(a.expirationDate);
                let dateB = new Date(b.expirationDate);
                return dateA - dateB;
            });
        } else if (expirationSorted === false) {
            sorted.sort((a, b) => {
                let dateA = new Date(a.expirationDate);
                let dateB = new Date(b.expirationDate);
                return dateB - dateA;
            });
        }

        setSortedProducts(sorted);
    }, [expirationSorted, products]);

    return (
        <>
            <div className={`items__list ${!listView && 'carts__view'}`}>
                <div className='select-view-options'>
                    <SlList
                        className='select-option'
                        onClick={() => setListView(true)}
                    />
                    <SlGrid
                        className='select-option'
                        onClick={() => setListView(false)}
                    />
                </div>
                <ul
                    className='categories__list__row'
                    style={{ display: `${listView ? 'flex' : 'none'}` }}
                >
                    <li className='category__list__row__position'>
                        Product Name
                    </li>
                    <li className='category__list__row__position '>
                        <div
                            className='expiration-date'
                            onClick={() =>
                                setCathegorySorted(!expirationSorted)
                            }
                        >
                            Expiration Date{' '}
                            <span className='expiration-date__icon'>
                                {expirationSorted ? (
                                    <IoMdArrowRoundDown />
                                ) : (
                                    <IoMdArrowRoundUp />
                                )}
                            </span>
                        </div>
                    </li>
                    <li className='category__list__row__position'>Category</li>
                    <li className='category__list__row__position'>Remove</li>
                </ul>
            </div>

            {/* MAP FUNCTION */}
            <section className={listView ? '' : 'products__section'}>
                {sortedProducts.map(
                    ({ name, id, expirationDate, cathegory, _id }) => (
                        <ul
                            className={`${
                                listView ? 'items__list__row' : 'items__grid'
                            } ${nightMode === true ? 'night__mode' : ''}`}
                            key={_id}
                            id='single__item'
                        >
                            <li
                                className={
                                    listView
                                        ? 'items__list__row__position'
                                        : 'item__name'
                                }
                            >
                                {name}
                            </li>
                            <li
                                className={
                                    listView
                                        ? 'items__list__row__position item__border'
                                        : 'item__date'
                                }
                            >
                                {showProductDate(expirationDate)}
                                <p className='days__until '>
                                    expiry date: <br className='mobile-br' />
                                    <span>
                                        {countExpirationDays(expirationDate)}
                                    </span>
                                </p>
                            </li>
                            <li
                                className={
                                    listView
                                        ? 'items__list__row__position'
                                        : 'item__category'
                                }
                            >
                                {cathegory}
                            </li>
                            <li
                                className={
                                    listView
                                        ? 'items__list__row__position'
                                        : 'item__remove'
                                }
                            >
                                <button
                                    className='remove__item'
                                    //onClick={() => handleDeleteProduct(_id)}
                                    onClick={() => handleDeleteProduct(id, _id)}
                                >
                                    &#10005;
                                </button>
                            </li>
                        </ul>
                    )
                )}
            </section>
        </>
    );
}

export default ItemsList;
