import React from 'react';
import axios from 'axios';
import { Route } from 'react-router';

import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Drawer from './components/Drawer';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        try {
            async function fetchData() {
                const url = 'https://60e5c3f6086f730017a6fdd9.mockapi.io';
                const [cartResponse, favoritesResponse, itemsResponse] =
                    await Promise.all([
                        axios.get(`${url}/cart`),
                        axios.get(`${url}/favorites`),
                        axios.get(`${url}/items`)
                    ]);

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            }
            fetchData();
        } catch (error) {
            alert('Ошибка при получение данных ;(');
            console.log(error);
        }

    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev => [...prev, obj]);
                const { data } = await axios.post('https://60e5c3f6086f730017a6fdd9.mockapi.io/cart', obj);
                setCartItems(prev => 
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id
                            };
                        };
                        return item;
                    })
                );
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину ;(');
            console.error(error);
        }
    };

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                setFavorites(prev => prev.filter(item => Number(item.id) !== Number(obj.id)));
                await axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites/${obj.id}`);
            } else {
                const { data } = await axios.post('https://60e5c3f6086f730017a6fdd9.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в закладки ;(');
            console.error(error);
        }
    };

    const onRemoveItem = async (id) => {
        try {
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)));
            await axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/cart/${id}`);
        } catch (error) {
            alert('Ошибка при удалении ;(');
            console.error(error);
        }
    };

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    };

    const onClearInput = () => {
        setSearchValue('');
    };

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider value={{
            items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToFavorite, onAddToCart
        }}>
            <div className="wrapper">
                <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} opened={cartOpened} />
                <Header onClickCart={() => setCartOpened(true)} />
                <Route path="/" exact>
                    <Home
                        items={items}
                        searchValue={searchValue}
                        cartItems={cartItems}
                        onClearInput={onClearInput}
                        onChangeSearchValue={onChangeSearchValue}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path="/favorites" exact>
                    <Favorites
                        onAddToFavorite={onAddToFavorite}
                    />
                </Route>
                <Route path="/orders" exact>
                    <Orders
                    />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
