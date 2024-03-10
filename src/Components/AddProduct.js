import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/products';
import { increaseProductsCount } from '../redux/productsCount';

import { v4 as uuidv4 } from 'uuid';

function AddProduct() {
    const dispatch = useDispatch();
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    let todaysDate = year + '-' + month + '-' + day;

    const [productName, setProductName] = useState('');
    const [cathegory, setCathegory] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const allCategories = document.querySelectorAll(
        '.product-category-selector'
    );

    const categories = [
        'Bakery',
        'Dairy',
        'Drinks',
        'Meat',
        'Fruits',
        'Vegetables',
        'Sweets',
        'Other',
    ];

    const handleClearInputs = () => {
        setProductName('');
        setCathegory('');
        setExpirationDate(''); // czyszczenie inputów
    };

    const handleCathegoryChoice = (e, productCategory) => {
        let activeCategory = e.target;
        setCathegory(productCategory);
        for (let i = 0; i < allCategories.length; i++) {
            allCategories[i].classList.remove('category-selected');
        }
        activeCategory.classList.add('category-selected');
    };

    const handleAddProduct = async () => {
        if (productName !== '' && cathegory !== '' && expirationDate !== '') {
            const product = {
                name: productName,
                cathegory,
                id: uuidv4(),
                expirationDate,
            };

            //handling MongoDB - sending product to MongoDB
            const response = await fetch('http://localhost:5000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });
            const json = await response.json();

            if (!response.ok) {
                console.error(json);
                throw new Error('Failed to add task');
            } else if (response.ok) {
                console.log('nowy produkt dodany ' + JSON.stringify(json));
                dispatch(addProduct(json));

                dispatch(increaseProductsCount({ payload: 1 })); //zwiększenie liczby itemków

                for (let i = 0; i < allCategories.length; i++) {
                    allCategories[i].classList.remove('category-selected');
                }
                handleClearInputs();
            }
        } else alert('You need to fill all the fields');
    };

    return (
        <section className='add_product'>
            <div className='add_product-container'>
                <h2>Add New Product</h2>
                <label htmlFor='product__name'>
                    Product Name
                    <input
                        type='text'
                        id='product__name'
                        required
                        placeholder='Enter product name'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </label>

                <label htmlFor='expiration__date'>
                    Expiration Date
                    <input
                        type='date'
                        id='expiration__date'
                        min={todaysDate}
                        max='2035-12-31'
                        required
                        placeholder='Select date'
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                    />
                </label>

                <label>
                    Product Category
                    <div className='products_categories'>
                        {categories.map((category) => (
                            <div
                                key={category}
                                className='product-category-selector'
                                onClick={(e) =>
                                    handleCathegoryChoice(e, category)
                                }
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </label>

                <div className='form__buttons'>
                    <button
                        onClick={handleClearInputs}
                        className='form__cancel'
                    >
                        Cancel
                    </button>
                    <button onClick={handleAddProduct} className='add'>
                        Add
                    </button>
                </div>
            </div>

            <img
                src={process.env.PUBLIC_URL + '/food2.png'}
                alt='food'
                className='add_product-image'
            />
        </section>
    );
}

export default AddProduct;
