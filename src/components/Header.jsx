import { Link } from 'react-router-dom';

function Header({ onClickCart }) {
    return (
        <header>
            <div className="headerLeft">
                <Link to="/">
                    <img src="/img/logo.png" alt="logo" />
                </Link>
                <div>
                    <h3>REACT SNEAKERS</h3>
                    <p>Магазин лучших кросовок</p>
                </div>
            </div>
            <ul className="headerRight">
                <li>
                    <img width="18" height="18" src="img/cart.svg" alt="cart" onClick={onClickCart} />
                    <span>1205 руб.</span>
                </li>
                <li>
                    <Link to="/favorites">
                        <img width="18" height="18" src="img/heart.svg" alt="favorites" />
                    </Link>
                </li>
                <li>
                    <img width="18" height="18" src="img/user.svg" alt="user" />
                </li>
            </ul>
        </header>
    );
}

export default Header;