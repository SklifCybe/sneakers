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
    }
];

function App() {
    return (
        <div className="wrapper">
            <Drawer />
            <Header />
            <div className="content">
                <div className="content__header">
                    <h1>Все кроссовки</h1>
                    <div className="search-block">
                        <img src="/img/search.svg" alt="search" />
                        <input placeholder="Поиск..." />
                    </div>
                </div>

                <div className="sneakers">
                    {sneakers.map(s => {
                        return <Card title={s.title} imageUrl={s.imageUrl} price={s.price} />
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
