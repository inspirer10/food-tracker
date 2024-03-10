import React from 'react';
import RadialChart from './RadialChart';
import CountUp from 'react-countup';
//import { useDispatch, useSelector } from 'react-redux';
//import { setProducts } from '../redux/products';

function DataCharts() {
    //! DANE Z REDUCERA
    /*const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:5000');
            const json = await response.json();
            dispatch(setProducts(json));
        };
        fetchProducts();
    }, []);*/

    //console.log(productsData);
    return (
        <section className='data_charts'>
            <h2>Data Insights</h2>
            <p className='data_charts-info'>
                Track and analyze your food consumption patterns.
            </p>

            <article className='products_stats'>
                <div className='single-info'>
                    <p>Total Products</p>
                    <span>
                        <CountUp
                            enableScrollSpy={true}
                            end={2137}
                            duration={5}
                            scrollSpyOnce={true}
                        />
                    </span>
                </div>
                <div className='single-info'>
                    <p>Consumed Products</p>
                    <span>
                        <CountUp
                            enableScrollSpy={true}
                            end={1337}
                            duration={5}
                            scrollSpyOnce={true}
                        />
                    </span>
                </div>
                <div className='single-info'>
                    <p>Wasted Products</p>
                    <span>
                        <CountUp
                            enableScrollSpy={true}
                            end={100}
                            duration={5}
                            scrollSpyOnce={true}
                        />
                    </span>
                </div>
            </article>

            <article className='radial_chart-pie'>
                <RadialChart />
            </article>
        </section>
    );
}

export default DataCharts;
