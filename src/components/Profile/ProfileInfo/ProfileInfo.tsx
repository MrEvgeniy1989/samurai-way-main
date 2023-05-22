import React, {FC} from 'react';
import s from './ProfileInfo.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import userPhoto from './../../../assets/images/user.png'
import {Contact} from "./Contact/Contact";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import {ProfileType} from "../../../types/types";

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photoFile: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

export const ProfileInfo: FC<ProfileInfoPropsType> = ({
                                                          profile,
                                                          status,
                                                          updateStatus,
                                                          isOwner,
                                                          savePhoto,
                                                          saveProfile
                                                      }) => {

    let [editMode, setEditMode] = React.useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={profile.photos?.large || userPhoto} alt={'Avatar'} className={s.mainPhoto}/>
                    {isOwner && <input type="file" className={s.fileInput} onChange={onMainPhotoSelected}/>}
                </div>
                {editMode
                    ? <ProfileDataForm onSubmit={onSubmit} profile={profile} initialValues={profile}/>
                    : <ProfileData profile={profile} isOwver={isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwver: boolean
    goToEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwver, goToEditMode}) => {
    return (
        <div>
            {isOwver && <div>
                <button onClick={goToEditMode}>Edit</button>
            </div>}
            <div>
                <b>Full name: </b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My professional skills: </b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me: </b> {profile.aboutMe}
            </div>
            <br/>
            <div>
                <b>Contacts: </b> {profile.contacts && Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
        </div>
    )
}

