import React from 'react';

import AppContext from '../context';

function Info({title, imgUrl, description}) {

  const {setCartOpened} = React.useContext(AppContext);

  return (
    <div className="cartEmpty">
      <img width={120} src={imgUrl} alt="empty cart" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenBtn">
        <img src="img/arrow.svg" alt="arrow" />
          Вернуться назад
      </button>
    </div>
  );
}

export default Info;
