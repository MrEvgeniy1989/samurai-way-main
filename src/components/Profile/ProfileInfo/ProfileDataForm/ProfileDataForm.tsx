import React, { FC } from "react";
import { createField, Input, Textarea } from "../../../common/FormsControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import styleFormControls from "../../../common/FormsControls/FormsControls.module.css";
import { ProfileType } from "../../../../types/types";

type ProfileDataFormPropsType = {
  profile: ProfileType;
};

export type FormDataType = {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
};

const ProfileDataForm: FC<InjectedFormProps<FormDataType> & ProfileDataFormPropsType> = ({
  handleSubmit,
  error,
  profile,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>

      {error && <div className={styleFormControls.formSummaryError}>{error}</div>}

      <div>
        <b>Full name: </b> {createField("Full name", "fullName", [], Input)}
      </div>
      <div>
        Looking for a job:
        {createField("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div>
        <b>My professional skills: </b>
        {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
      </div>

      <div>
        <b>About me: </b>
        {createField("About me", "aboutMe", [], Textarea)}
      </div>

      <div>
        <b>Contacts: </b>{" "}
        {profile.contacts &&
          Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key} className={"s.contact"}>
                <b>
                  {key}: {createField(key, "contacts." + key, [], Input)}
                </b>
              </div>
            );
          })}
      </div>
    </form>
  );
};

const ProgileDataFormReduxForm = reduxForm<any, any>({ form: "edit-profile" })(ProfileDataForm);
export default ProgileDataFormReduxForm;
