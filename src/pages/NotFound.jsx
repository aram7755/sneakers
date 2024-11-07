import React from "react";
import { Empty } from "@/components";

const NotFound = () => {
  return (
    <Empty
      imgUrl="/img/emptyFavorite.png"
      title="404"
      text="Страница не найдена"
    />
  );
};

export default NotFound;
