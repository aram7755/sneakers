import styles from "./basket.module.css";
import { Icon, Empty } from "../index";
import { useState, useEffect } from "react";
import { useBasket } from "@/hooks/useBasket";
import { useShop } from "@/hooks/useShop";
import { isShowBasket } from "@/store/isShowBasket";
import { Card } from "./Card";

export const Basket = (props) => {
  const [isBuy, SetIsBuy] = useState(false);
  // const { onClickClose } = props;
  const { basket, total, totalPrice } = useBasket();
  const { addShop, shopProductsLength } = useShop();
  const { setIsShow, isShow } = isShowBasket();

  useEffect(() => {
    return () => {
      SetIsBuy(false)
    };
  }, [isShow]);

  const onclickBuy = async () => {
    SetIsBuy(true);
    await addShop(basket);
  };

  return (
    <>
      {isShow && (
        <>
          <div className={styles.overlay} onClick={setIsShow}></div>
          <div className={styles.aside}>
            <h2 className={styles.title}>Корзина</h2>
            <button onClick={setIsShow}>X</button>
            {basket.length > 0 ? (
              <>
                <div className={styles.cartWrapper}>
                  {basket.map((item) => (
                    <Card key={item.id} {...item} />
                  ))}
                  <div className={styles.items}>
                    <ul className={styles.itemsList}>
                      <li className={styles.itemsProps}>
                        <p className={styles.text}>Итого:</p>
                        <div className={styles.dots}></div>
                        <span className={styles.price}>{totalPrice} руб.</span>
                      </li>
                      <li className={styles.itemsProps}>
                        <p className={styles.text}>Налог 5%:</p>
                        <div className={styles.dotsSec}></div>
                        <span className={styles.price}>{total} руб.</span>
                      </li>
                    </ul>
                    <button
                      disabled={isBuy}
                      styles={{ opacity: isBuy && "0.5" }}
                      className={styles.buttonConfirm}
                      onClick={onclickBuy}
                    >
                      Оформить заказ
                      <Icon className={styles.arrowRight} id={"arrowRight"} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Empty
                imgUrl={isBuy ? "img/emptySuccess.png" : "img/Empty.png"}
                title={isBuy ? "Заказ оформлен!" : "Корзина пустая"}
                text={
                  isBuy
                    ? `Ваш заказ #${shopProductsLength} скоро будет передан курьерской доставке`
                    : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
                }
                onClickButton={setIsShow}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
