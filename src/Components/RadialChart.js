import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';

export const options = {
    slices: {
        0: { color: '#ff0000' },
        1: { color: '#ff7f00' },
        2: { color: '#caca44' },
        3: { color: '#00ff00' },
        4: { color: '#007fff' },
        5: { color: '#0000ff' },
        6: { color: '#4b0082' },
        7: { color: '#9400d3' },
    },
};

function RadialChart() {
    const { products } = useSelector((state) => state.products);

    const fruits = products.filter((product) => product.cathegory === 'Fruits');
    const vegetables = products.filter(
        (product) => product.cathegory === 'Vegetables'
    );
    const drinks = products.filter((product) => product.cathegory === 'Drinks');
    const bakery = products.filter((product) => product.cathegory === 'Bakery');
    const dairy = products.filter((product) => product.cathegory === 'Dairy');
    const sweets = products.filter((product) => product.cathegory === 'Sweets');
    const other = products.filter((product) => product.cathegory === 'Other');
    const meat = products.filter((product) => product.cathegory === 'Meat');

    const data = [
        ['Category', 'Items'],
        ['Bakery', bakery.length],
        ['Dairy', dairy.length],
        ['Drinks', drinks.length],
        ['Meat', meat.length],
        ['Fruits', fruits.length],
        ['Vegetables', vegetables.length],
        ['Sweets', sweets.length],
        ['Other', other.length],
    ];

    return (
        <>
            <h2>Product Categories</h2>
            <Chart
                chartType='PieChart'
                data={data}
                options={options}
                width={'100%'}
                height={'500px'}
            />
        </>
    );
}

export default RadialChart;
