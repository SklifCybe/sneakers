
function Drawer() {
    return (
        <div style={{ display: 'none' }} className="overlay">
            <div className="drawer">
                <h2>
                    Корзина
                    <img className="btnRemove" src="/img/btn-remove.svg" alt="remove" />
                </h2>
                <div className="drawer__items">
                    <div className="cartItem">
                        <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className="cartItem__img"></div>
                        <div className="cartItem__text">
                            <p>Мужские кроссовки Nike Air Max 270</p>
                            <b>12 999 р.</b>
                        </div>
                        <img className="btnRemove" src="/img/btn-remove.svg" alt="remove" />
                    </div>
                    <div className="cartItem">
                        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }} className="cartItem__img"></div>
                        <div className="cartItem__text">
                            <p>Мужские кроссовки Nike Air Max 270</p>
                            <b>12 999 р.</b>
                        </div>
                        <img className="btnRemove" src="/img/btn-remove.svg" alt="remove" />
                    </div>
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