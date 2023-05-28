import React, { FC } from "react";
import s from "./Contact.module.css";

type ContactPropsType = {
  contactTitle: string | null;
  contactValue: string | null;
};
export const Contact: FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      <span>
        <b>{contactTitle}</b>:{" "}
      </span>
      {contactValue}
    </div>
  );
};
