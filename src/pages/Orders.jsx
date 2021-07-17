import React from 'react';
import axios from 'axios';

import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
			try {
				const { data } = await axios.get('https://60e5c3f6086f730017a6fdd9.mockapi.io/orders');
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
			} catch (error) {
				alert('Ошибка при отображении заказов');
				console.error(error);
			}
    })();
  }, []);

  return (
    <div className="content">
      <h1 className="contentHeader">Мои заказы</h1>
      <div className="sneakers">
        {(isLoading ? [...Array(10)] : orders).map((i, index) => {
          return (
            <Card
              key={index}
              loading={isLoading}
              {...i}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
