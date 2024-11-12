import { useState } from "react";
import styles from "./catalog.module.css";
import { Card, Search } from "../index";
import Skeleton from "../Card/Skeleton";

export const Catalog = (props) => {
  const { products, children, isloading } = props;
  const [searchValue, setSearchValue] = useState("");

  const sneakers = products
    .filter((obj) =>
      obj.title?.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((obj, index) => (
      <li key={index}>
        <Card {...obj} className={styles.item}/>
      </li>
    ));
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} className={styles.skeleton} />
  ));

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.content}>
          {children}
          <Search value={searchValue} setValue={setSearchValue} />
        </div>
        <ul className={styles.list}>{isloading ? skeletons : sneakers}</ul>
      </div>
    </section>
  );
};
