import React, { ChangeEvent, FC } from "react";
import s from "./Profile.module.css";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../types/types";
import userPhoto from "../../assets/images/user.png";
import { Image, Input } from "antd";
import { AppStateType } from "../../redux/redux-store";
import { useSelector } from "react-redux";
import { DownloadOutlined } from "@ant-design/icons";
import { savePhoto } from "../../redux/profile-reducer";

export const Profile: FC<ProfilePropsType> = (props) => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className={s.profile}>
      <div className={s.avatarBlock}>
        <Image
          className={s.mainPhoto}
          preview={{ className: s.previewImage }}
          src={profile?.photos.large || userPhoto}
          alt={"Avatar"}
        />
        {/*<img src={profile.photos.large || userPhoto} alt={"Avatar"} className={s.mainPhoto} />*/}
        {props.isOwner && (
          <>
            <label htmlFor="file-upload" className={s.customFileUpload}>
              <DownloadOutlined />
            </label>
            <Input id="file-upload" type="file" className={s.fileInput} onChange={onMainPhotoSelected} />
          </>
        )}
      </div>
      <div className={s.profileContent}>
        <ProfileInfo
          savePhoto={props.savePhoto}
          isOwner={props.isOwner}
          profile={props.profile}
          status={props.status}
          saveProfile={props.saveProfile}
          updateStatus={props.updateStatus}
        />
        <MyPostsContainer />
      </div>
    </div>
  );
};

// Types
type ProfilePropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};
