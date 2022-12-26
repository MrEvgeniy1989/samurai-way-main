import {connect} from 'react-redux';
import {AppStateType} from '../../redux/redux-store';
import {Dispatch} from 'redux';
import {followAC, setUsersAC, unfollowAC, UserType} from '../../redux/users-reducer';
import {Users} from './Users';

type MapStateToPropsType = {
    users: UserType[]
}
type MapDispatchToPropsType = {
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    setUsers: (users:UserType[]) => void
}
export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
    return {
        follow: (userId:number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId:number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users:UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)