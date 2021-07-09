import Card from '../components/Card';

function Home({
    items,
    searchValue,
    onClearInput,
    onChangeSearchValue,
    onAddToFavorite,
    onAddToCart
}) {
    return (
        <div className="content">
            <div className="contentHeader">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className="search-block">
                    <img src="/img/search.svg" alt="search" />
                    {searchValue &&
                        <img onClick={onClearInput} className="btnRemove clear" src="/img/btn-remove.svg" alt="clear" />
                    }
                    <input
                        placeholder="Поиск..."
                        onChange={onChangeSearchValue}
                        value={searchValue}
                    />
                </div>
            </div>
            <div className="sneakers">
                {items
                    .filter(i => i.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map(i => {
                        return <Card
                            key={i.id}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            onPlus={(obj) => onAddToCart(obj)}
                            {...i}
                        />
                    })}
            </div>
        </div>
    );
}

export default Home;