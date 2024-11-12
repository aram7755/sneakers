import styles from "./basket.module.css";
import clsx from "clsx";
import { Icon } from "../index";
import { useState } from "react";
import { useBasket } from "../../hooks/useBasket";

export const Card = (props) => {
  const { title, price, img, id } = props;
  const [loading, setLoading] = useState(false);
  const { removeProduct } = useBasket();

  const onClickRemoveCard = async () => {
    setLoading(true);
    await removeProduct(id);
    setLoading(false);
  };


  return (
    <div className={styles.cartItem}>
      <img className={styles.img} src={img} alt="Sneakers" />
      <div className={styles.cartContent}>
        <p className={styles.cartItemTitle}>{title}</p>
        <span className={styles.span}>{price} руб.</span>
      </div>
      <button
        disabled={loading}
        className={clsx(styles.buttonClose, loading && styles.loading)}
        onClick={onClickRemoveCard}
      >
        <Icon className={styles.icon} id={"close"} />
      </button>
    </div>
  );
};
