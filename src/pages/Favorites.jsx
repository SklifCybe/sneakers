import React from 'react';

import AppContext from '../context';
import Card from "../components/Card";

function Favorites({ onAddToFavorite }) {

    const {favorites} = React.useContext(AppContext);

    return (
        <div className="content">
            <h1 className="contentHeader">Мои закладки</h1>
            <div className="sneakers">
                {favorites.map((i) => {
                    return (
                        <Card
                            key={i.id}
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            {...i}
                        />
                    )
                })}
            </div>
        </div>
    );
};

export default Favorites;