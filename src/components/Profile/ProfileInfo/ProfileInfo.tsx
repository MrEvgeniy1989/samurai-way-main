import React, { FC } from 'react';
import s from './ProfileInfo.module.css';
import { Preloader } from '../../common/Preloader/Preloader';
import { ProfileStatusWithHooks } from './ProfileStatusWithHooks';
import { Contact } from './Contact/Contact';
import ProfileDataForm from './ProfileDataForm/ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

type ProfileInfoPropsType = {
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  // savePhoto: (photoFile: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

export const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, status, updateStatus, isOwner, saveProfile }) => {
  let [editMode, setEditMode] = React.useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className={s.descriptionBlock}>
      <div className={s.profileStatus}>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
      {editMode ? (
        <ProfileDataForm onSubmit={onSubmit} profile={profile} initialValues={profile} />
      ) : (
        <ProfileData
          profile={profile}
          isOwner={isOwner}
          goToEditMode={() => {
            setEditMode(true);
          }}
        />
      )}
    </div>
  );
};

type ProfileDataPropsType = {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
};

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={s.profileData}>
      <div className={s.profileDataContent}>
        <div>
          <span>
            <b>Full name</b>:{' '}
          </span>
          {profile.fullName}
        </div>
        <div>
          <span>
            <b>Looking for a job</b>:{' '}
          </span>
          {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob && (
          <div>
            <span>
              <b>My professional skills</b>:{' '}
            </span>
            {profile.lookingForAJobDescription}
          </div>
        )}
        <div>
          <span>
            <b>About me</b>:{' '}
          </span>
          {profile.aboutMe}
        </div>
        <br />
        <div>
          <b>Contacts</b>:{' '}
          {Object.keys(profile.contacts).map(key => {
            return (
              profile.contacts[key as keyof ContactsType] && (
                <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
              )
            );
          })}
        </div>
      </div>
      {isOwner && (
        <div className={s.editButton}>
          <Button onClick={goToEditMode}>
            <EditOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};
