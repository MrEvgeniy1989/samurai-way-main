import React, { FC } from "react";
import preloader from "../../../assets/images/preloader.svg";

export const Preloader: FC = () => {
  return (
    <div>
      <img src={preloader} alt={"Loading"} />
    </div>
  );
};
