import React, {ComponentType} from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {
    getStatus,
    getUserProfile,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';


type MapStateToPropsType = {
    profile: ProfileType
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType, AppStateType> {

    refreshProfile() {

        let userId = +this.props.match.params.userId
        if (!userId) {
            this.props.authorizedUserId !== null ? userId = this.props.authorizedUserId : this.props.history.push('login')
        }


        // let userId = +this.props.match.params.userId
        // if (!userId) {
        //     this.props.authorizedUserId !== null ? userId = this.props.authorizedUserId : this.props.history.push('login')
        //     // userId = this.props.authorizedUserId !== null ? this.props.authorizedUserId : 1049
        //
        //     // userId = this.props.authorizedUserId
        //     // if (!userId) {
        //     //   this.props.history.push('login')
        //     // }
        // }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<AppStateType>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer)