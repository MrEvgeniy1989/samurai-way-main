import React from 'react';
import s from './ProfileInfo.module.css';
import {ProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../common/Preloader/Preloader';

type ProfileInfoPropsType = {
    profile: ProfileType | null
}

export const ProfileInfo = (props: ProfileInfoPropsType) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.profileInfoImg}>
                <img
                    src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                    alt="image1"/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile?.photos.large}/>
                ava + description
            </div>
        </div>
    );
}