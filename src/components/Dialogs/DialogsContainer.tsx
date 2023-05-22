import React, { ComponentType } from "react";
import { InitialStateType, sendMessageCreator } from "../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { compose, Dispatch } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type MapStateToPropsType = {
  dialogsPage: InitialStateType;
};
type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void;
};
export type DialogsPropsType = MapStateToPropsType & MapDispatchToPropsType;

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    sendMessage: (newMessageBody: string) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
  };
};

export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
