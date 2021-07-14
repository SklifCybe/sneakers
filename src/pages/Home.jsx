import React from 'react';

import Card from '../components/Card';
import AppContext from '../context';

function Home({ items, searchValue, onClearInput, onChangeSearchValue, isLoading }) {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);

  const renderItems = () => {
    const filterItems = items.filter((i) =>
      i.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [...Array(8)] : filterItems).map((i, index) => {
      return (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorite(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          loading={isLoading}
          {...i}
        />
      );
    });
  };

  return (
    <div className="content">
      <div className="contentHeader">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="search" />
          {searchValue && (
            <img
              onClick={onClearInput}
              className="btnRemove clear"
              src="/img/btn-remove.svg"
              alt="clear"
            />
          )}
          <input placeholder="Поиск..." onChange={onChangeSearchValue} value={searchValue} />
        </div>
      </div>
      <div className="sneakers">{renderItems()}</div>
    </div>
  );
}

export default Home;
