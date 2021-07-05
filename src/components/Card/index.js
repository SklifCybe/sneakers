
import styles from './Card.module.scss';

function Card({title, imageUrl, price}) {
    const onClickButton = () => {
        alert(title);
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="img/unliked.svg" alt="unliked" />
            </div>
            <img width="133" height="112" src={imageUrl} alt="sneakers" />
            <h5>{title}</h5>
            <div className={styles.footer}>
                <div className={styles.price}>
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <button className={styles.button} onClick={onClickButton}>
                    <img width="11" height="11" src="img/plus.svg" alt="plus" />
                </button>
            </div>
        </div>
    );
}

export default Card;