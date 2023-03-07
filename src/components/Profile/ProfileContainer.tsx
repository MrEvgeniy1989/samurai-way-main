import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';


type MapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
}
type PathParamsType = {
    userId: string
}

export type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType, AppStateType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2';
        }
        this.props.getUserProfile(+userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to={'/Login'}/>
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(WithUrlDataContainerComponent)
