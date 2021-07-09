import React from 'react';
import axios from 'axios';
import { Route } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drawer from './components/Drawer';

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);

    React.useEffect(() => {
        axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/items')
            .then(res => setItems(res.data));
        axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/cart')
            .then(res => setCartItems(res.data));
        axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites')
            .then(res => setFavorites(res.data));
    }, []);

    const onAddToCart = (obj) => {
        axios.post('https://60e5c3f6086f730017a6fdd9.mockapi.io/cart', obj);
        setCartItems(prev => [...prev, obj]);
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites/${obj.id}`);
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

    return (
        <div className="wrapper">
            {cartOpened && <Drawer items={cartItems} onRemove={(id) => onRemoveItem(id)} onClose={() => setCartOpened(false)} />}
            <Header onClickCart={() => setCartOpened(true)} />
            <Route path="/" exact>
                <Home
                    items={items}
                    searchValue={searchValue}
                    onClearInput={onClearInput}
                    onChangeSearchValue={onChangeSearchValue}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                />
            </Route>
            <Route path="/favorites" exact>
                <Favorites
                    items={favorites}
                    onAddToFavorite={onAddToFavorite}
                />
            </Route>
        </div>
    );
}

export default App;
