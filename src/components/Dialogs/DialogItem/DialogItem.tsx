import React from "react";
import s from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";

export type DialogItemPropsType = {
  id: number;
  name: string;
};

export const DialogItem: React.FC<DialogItemPropsType> = (props) => {
  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
    </div>
  );
};
