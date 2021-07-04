
function Header() {
    return (
        <header>
                <div className="headerLeft">
                    <img src="/img/logo.png" alt="logo" />
                    <div>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин лучших кросовок</p>
                    </div>
                </div>
                <ul className="headerRight">
                    <li>
                        <img width="18" height="18" src="img/cart.svg" alt="cart" />
                        <span>1205 руб.</span>
                    </li>
                    <li>
                        <img width="18" height="18" src="img/user.svg" alt="user" />
                    </li>
                </ul>
            </header>
    );
}

export default Header;