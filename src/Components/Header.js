import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../redux/products';
import { changeState } from '../redux/nightMode';
import { v4 as uuidv4 } from 'uuid';
import { CgClose } from 'react-icons/cg';

let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector('header').classList.remove('scrolling-down');
    } else {
        document.querySelector('header').classList.add('scrolling-down');
    }
    prevScrollpos = currentScrollPos;
};

function Header() {
    const dispatch = useDispatch();
    const { nightMode } = useSelector((state) => state.nightMode);
    const [modalView, setModalView] = useState(false);
    const [productName, setProductName] = useState('');
    const [cathegory, setCathegory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [nightModeState, setNightModeState] = useState(nightMode);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    let todaysDate = year + '-' + month + '-' + day;

    const handleAddProduct = () => {
        if (productName !== '' && cathegory !== '' && expirationDate !== '') {
            dispatch(
                addProduct({
                    name: productName,
                    id: uuidv4(),
                    cathegory: cathegory,
                    expirationDate: expirationDate,
                })
            );

            setModalView(!modalView); //zamknięcie modala
            setProductName('');
            setCathegory('');
            setExpirationDate(''); // czyszczenie inputów
        } else alert('You need to fill all the fields');
    };

    function toggleMode() {
        const bodyEl = document.querySelector('body');
        const itemsList = document.querySelector('.items__list');
        const itemsCarts = document.querySelectorAll('#single__item');
        if (!nightMode) {
            dispatch(changeState(true));
            bodyEl.style.setProperty('background-color', '#101010');
            bodyEl.style.setProperty('color', 'white');
            itemsList.style.setProperty('border-bottom-color', 'white');
            for (let i = 0; i < itemsCarts.length; i++) {
                itemsCarts[i].classList.add('night__mode');
            }
        } else {
            dispatch(changeState(false));
            bodyEl.style.setProperty('background-color', 'white');
            bodyEl.style.setProperty('color', '#001C30');
            itemsList.style.setProperty('border-bottom-color', '#001C30');
            for (let i = 0; i < itemsCarts.length; i++) {
                itemsCarts[i].classList.remove('night__mode');
            }
        }
    }

    useEffect(() => {
        if (nightMode === true) {
            const bodyEl = document.querySelector('body');
            const itemsList = document.querySelector('.items__list');
            bodyEl.style.setProperty('background-color', '#101010');
            bodyEl.style.setProperty('color', 'white');
            itemsList.style.setProperty('border-bottom-color', 'white');
        }
    }, [nightMode]);

    return (
        <>
            <header className={`${nightMode ? 'night-mode' : ''}`}>
                <label class='toggle-night-mode'>
                    <input
                        type='checkbox'
                        id='slider'
                        onClick={() => {
                            setNightModeState(!nightModeState);
                            toggleMode();
                        }}
                        checked={nightMode ? true : false}
                    />
                </label>

                <h1 className={`${nightMode ? 'night-mode' : ''}`}>
                    Expiry Date Tracker
                </h1>
            </header>

            <div className={modalView ? 'modal show__modal' : 'modal'}>
                <div className='modal__content'>
                    <CgClose
                        className='close__modal'
                        onClick={() => {
                            setModalView(!modalView);
                        }}
                    />

                    <div className='modal__row'>
                        <label htmlFor='product_name'>
                            Product Name
                            <input
                                type='text'
                                id='product_name'
                                required
                                placeholder='orange juice'
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </label>

                        <label htmlFor='category'>
                            Category
                            <select
                                name='category'
                                id='category'
                                required
                                value={cathegory}
                                onChange={(e) => setCathegory(e.target.value)}
                            >
                                <option value=''>select an option</option>
                                <option value='Alcohol'>Alcohol</option>
                                <option value='Drinks'>Drinks</option>
                                <option value='Dairy'>Dairy</option>
                                <option value='Fruit & Vegetables'>
                                    Fruit & Vegetables
                                </option>
                                <option value='Meat'>Meat</option>
                                <option value='Sea food'>Sea food</option>
                                <option value='Sweets'>Sweets</option>
                                <option value='Other'>Other</option>
                            </select>
                        </label>
                    </div>
                    <div className='modal__row'>
                        <label htmlFor='date'>
                            Expiration Date
                            <input
                                type='date'
                                id='date'
                                min={todaysDate}
                                max='2030-12-31'
                                required
                                value={expirationDate}
                                onChange={(e) =>
                                    setExpirationDate(e.target.value)
                                }
                            />
                        </label>
                    </div>
                    <button onClick={handleAddProduct}>Add Product</button>
                </div>
            </div>
        </>
    );
}

export default Header;
