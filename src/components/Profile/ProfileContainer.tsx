import React, {ComponentType} from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {getUserProfile, ProfileType} from '../../redux/profile-reducer';
import {AppStateType} from '../../redux/redux-store';
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {Dialogs} from '../Dialogs/Dialogs';


type MapStateToPropsType = {
  profile: ProfileType | null
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
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile
})

export default compose<ComponentType>(
  connect(mapStateToProps, {getUserProfile}),
  withRouter,
  // withAuthRedirect
)(ProfileContainer)