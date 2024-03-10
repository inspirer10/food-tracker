import './App.css';
import AddProduct from './Components/AddProduct';
import DataCharts from './Components/DataCharts';
import FoodCategories from './Components/FoodCategories';
import Footer from './Components/Footer';
import Header from './Components/Header';
import ItemsList from './Components/ItemsList';

function App() {
    return (
        <>
            <Header />
            <ItemsList />
            <AddProduct />
            <FoodCategories />
            <DataCharts />
            <Footer />
        </>
    );
}

export default App;
