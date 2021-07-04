import React from 'react';

import Header from './components/Header';
import Card from './components/Card';
import Drawer from './components/Drawer';

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
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default App;
