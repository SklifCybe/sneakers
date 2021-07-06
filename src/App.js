import React from 'react';

import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';

const sneakers = [
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        imageUrl: '/img/sneakers/1.jpg',
        price: 12999
    },
    {
        title: 'Мужские Кроссовки Nike Air Max 270',
        imageUrl: '/img/sneakers/2.jpg',
        price: 12999
    },
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        imageUrl: '/img/sneakers/3.jpg',
        price: 8499
    },
    {
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        imageUrl: '/img/sneakers/4.jpg',
        price: 8999
    },
    {
        title: 'Мужские Кроссовки Under Armour Curry 8',
        imageUrl: '/img/sneakers/5.jpg',
        price: 15199
    },
    {
        title: 'Мужские Кроссовки Nike Kyrie 7',
        imageUrl: '/img/sneakers/6.jpg',
        price: 11299
    },
    {
        title: 'Мужские Кроссовки Jordan Air Jordan 11',
        imageUrl: '/img/sneakers/7.jpg',
        price: 10799
    }
];

function App() {
    const [items, setItems] = React.useState(sneakers);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

    // React.useEffect(() => {
    //     // change on mockapi
    //     fetch('https://google.com')
    //         .then(res => res.json())
    //         .then(json => setItems(json));
    // }, []);

    const onAddToCart = (obj) => {
        setCartItems(prev => [...prev, obj]);
    };

    const onRemoveBtn = (item) => {
        const items = cartItems.filter((i) => i !== item);
        setCartItems(items);
    }; 
    
    return (
        <div className="wrapper">
            {cartOpened && <Drawer items={cartItems} onRemove={(item) => onRemoveBtn(item)} onClose={() => setCartOpened(false)} />}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="content">
                <div className="contentHeader">
                    <h1>Все кроссовки</h1>
                    <div className="search-block">
                        <img src="/img/search.svg" alt="search" />
                        <input placeholder="Поиск..." />
                    </div>
                </div>

                <div className="sneakers">
                    {items.map(i => {
                        return <Card 
                            title={i.title} 
                            imageUrl={i.imageUrl} 
                            price={i.price} 
                            onFavorite={() => alert('Добавили карточку в закладки')}
                            onPlus={(obj) => onAddToCart(obj)}
                        />
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
