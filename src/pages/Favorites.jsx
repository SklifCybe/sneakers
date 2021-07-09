import Card from "../components/Card";

function Favorites({ items = [], onAddToFavorite }) {
    return (
        <div className="content">
            <h1 className="contentHeader">Мои закладки</h1>
            <div className="sneakers">
                {items.map((i) => {
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