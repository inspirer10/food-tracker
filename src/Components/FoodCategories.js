import React from 'react';
import { useSelector } from 'react-redux';

function FoodCategories() {
    const { products } = useSelector((state) => state.products);

    const fruits = products.filter((product) => product.cathegory === 'Fruits');
    const vegetables = products.filter(
        (product) => product.cathegory === 'Vegetables'
    );
    const drinks = products.filter((product) => product.cathegory === 'Drinks');
    const bakery = products.filter((product) => product.cathegory === 'Bakery');
    const dairy = products.filter((product) => product.cathegory === 'Dairy');
    const sweets = products.filter((product) => product.cathegory === 'Sweets');
    const meat = products.filter((product) => product.cathegory === 'Meat');
    //const other = products.filter((product) => product.cathegory === 'Other');

    return (
        <section className='food_categories'>
            <img
                src={process.env.PUBLIC_URL + '/food.png'}
                alt='food'
                className='add_product-image'
            />
            <div className='food_categories-container'>
                <h2>Food Categories</h2>
                <p>Browse food products by categories.</p>
                <button>View All</button>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/red-apple.png'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Fruits</p>
                            <p className='category-description'>
                                Sweet and fresh fruits
                            </p>
                        </div>
                        <p className='item-number'>{fruits.length} products</p>
                    </div>
                </div>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://em-content.zobj.net/source/apple/118/broccoli_1f966.png'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Vegetables</p>
                            <p className='category-description'>
                                Fresh and oragnic vegetables
                            </p>
                        </div>
                        <p className='item-number'>
                            {vegetables.length} products
                        </p>
                    </div>
                </div>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://em-content.zobj.net/source/apple/48/bread_1f35e.png'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Bakery</p>
                            <p className='category-description'>
                                Freshly baked bread and pastries
                            </p>
                        </div>
                        <p className='item-number'>{bakery.length} products</p>
                    </div>
                </div>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://cdn-0.emojis.wiki/emoji-pics/apple/glass-of-milk-apple.png'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Dairy</p>
                            <p className='category-description'>
                                Milk, cheese, and yogurt
                            </p>
                        </div>
                        <p className='item-number'>{dairy.length} products</p>
                    </div>
                </div>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://em-content.zobj.net/source/apple/81/chocolate-bar_1f36b.png'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Sweets</p>
                            <p className='category-description'>
                                Chocolate, candy, cookies
                            </p>
                        </div>
                        <p className='item-number'>{sweets.length} products</p>
                    </div>
                </div>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://em-content.zobj.net/source/apple/114/cut-of-meat_1f969.png'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Meat</p>
                            <p className='category-description'>
                                Chicken, pork, beef
                            </p>
                        </div>
                        {meat.length === 1 ? (
                            <p className='item-number'>{meat.length} product</p>
                        ) : (
                            <p className='item-number'>
                                {meat.length} products
                            </p>
                        )}
                    </div>
                </div>

                <div className='categories_list'>
                    <div className='category_list-item'>
                        <img
                            src='https://symbl.cc/i/webp/d2/d026f1c2e0dd36f32b1f507cf71678.webp'
                            alt=''
                        />
                        <div className='category_list-info'>
                            <p className='category-name'>Drinks</p>
                            <p className='category-description'>
                                Cola, juice, ice tea
                            </p>
                        </div>
                        <p className='item-number'>{drinks.length} products</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FoodCategories;
