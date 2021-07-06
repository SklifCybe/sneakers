
function Drawer({ onClose, onRemove, items = [] }) {
    return (
        <div className="overlay">
            <div className="drawer">
                <h2>
                    Корзина
                    <img className="btnRemove" src="/img/btn-remove.svg" alt="close" onClick={onClose} />
                </h2>
                <div className="drawerItems">
                    {items.map((item) => {
                        return (
                            <div className="cartItem">
                                <div style={{ backgroundImage: `url(${item.imageUrl})` }} className="cartItemImg"></div>
                                <div className="cartItemText">
                                    <p>{item.title}</p>
                                    <b>{item.price} р.</b>
                                </div>
                                <img onClick={() => onRemove(item)} className="btnRemove" src="/img/btn-remove.svg" alt="remove" />
                            </div>
                        )
                    })}
                </div>
                <div className="cartTotalBlock">
                    <ul>
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>
                    <button className="greenBtn">
                        Оформить заказ
                        <img src="img/arrow.svg" alt="arrow" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Drawer;