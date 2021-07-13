import React from 'react';
import axios from 'axios';
import { Route } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drawer from './components/Drawer';
import AppContext from './context';

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/cart');
            const favoritesResponse = await axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites');
            const itemsResponse = await axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/items');

            setIsLoading(false);

            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
        }
        fetchData();
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/cart/${obj.id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
        } else {
            axios.post('https://60e5c3f6086f730017a6fdd9.mockapi.io/cart', obj);
            setCartItems(prev => [...prev, obj]);
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites/${obj.id}`);
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
            } else {
                const { data } = await axios.post('https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в закладки');
        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onClearInput = () => {
        setSearchValue('');
    };

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id));
    };

    return (
        <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems }}>
            <div className="wrapper">
                {cartOpened && <Drawer items={cartItems} onRemove={(id) => onRemoveItem(id)} onClose={() => setCartOpened(false) } />}
                <Header onClickCart={() => setCartOpened(true)} />
                <Route path="/" exact>
                    <Home
                        items={items}
                        searchValue={searchValue}
                        cartItems={cartItems}
                        onClearInput={onClearInput}
                        onChangeSearchValue={onChangeSearchValue}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path="/favorites" exact>
                    <Favorites
                        onAddToFavorite={onAddToFavorite}
                    />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
