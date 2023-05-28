import React, { FC } from "react";
import { createField, MyInput, MyTextarea } from "../../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import styleFormControls from "../../../common/FormsControls/FormsControls.module.css";
import { GetStringKeys, ProfileType } from "../../../../types/types";
import s from "./ProfileDataForm.module.css";
import { SaveOutlined } from "@ant-design/icons";
import { Button } from "antd";

type ProfileDataFormPropsType = {
  profile: ProfileType;
};

type ProfileTypeKeys = GetStringKeys<ProfileType>;

const ProfileDataForm: FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({
  handleSubmit,
  error,
  profile,
}) => {
  return (
    <form onSubmit={handleSubmit} className={s.profileDataForm}>
      <div className={s.profileDataFormContent}>
        {error && <div className={styleFormControls.formSummaryError}>{error}</div>}

        <div>
          <span>
            <b>Full name</b>:{" "}
          </span>
          {createField<ProfileTypeKeys>("Full name", "fullName", [], MyInput)}
        </div>
        <div>
          <span>
            <b>Looking for a job</b>:{" "}
          </span>
          {createField<ProfileTypeKeys>("", "lookingForAJob", [], MyInput, { type: "checkbox" })}
        </div>

        <div>
          <span>
            <b>My professional skills</b>:{" "}
          </span>
          {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], MyTextarea)}
        </div>

        <div>
          <span>
            <b>About me</b>:{" "}
          </span>
          {createField<ProfileTypeKeys>("About me", "aboutMe", [], MyTextarea)}
        </div>

        <div className={s.contacts}>
          <span className={s.contactsTitle}>
            <b>Contacts</b>:{" "}
          </span>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key} className={s.contact}>
                <b>
                  <span>{key}: </span>
                  {createField(key, "contacts." + key, [], MyInput)}
                </b>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <Button htmlType="submit" className={s.saveButton}>
          <SaveOutlined />
        </Button>
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({ form: "edit-profile" })(
  ProfileDataForm
);
export default ProfileDataFormReduxForm;
