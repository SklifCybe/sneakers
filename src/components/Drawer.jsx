import React from 'react';
import axios from 'axios';

import AppContext from '../context';
import Info from './Info';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://60e5c3f6086f730017a6fdd9.mockapi.io/order', {
        items: cartItems,
      });
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://60e5c3f6086f730017a6fdd9.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (err) {
      alert('Ошибка при создании заказа');
    }

    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина
          <img className="btnRemove" src="/img/btn-remove.svg" alt="close" onClick={onClose} />
        </h2>
        {items.length > 0 ? (
          <>
            <div className="drawerItems">
              {items.map((item) => {
                return (
                  <div key={item.id} className="cartItem">
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className="cartItemImg"></div>
                    <div className="cartItemText">
                      <p>{item.title}</p>
                      <b>{item.price} р.</b>
                    </div>
                    <img
                      onClick={() => onRemove(item.id)}
                      className="btnRemove"
                      src="/img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                );
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
              <button disabled={isLoading} onClick={onClickOrder} className="greenBtn">
                Оформить заказ
                <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пуста'}
            imgUrl={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотябы одну пару кросовок, чтобы сделать заказ'
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
