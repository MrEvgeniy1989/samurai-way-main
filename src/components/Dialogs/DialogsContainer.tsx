import React, { ComponentType } from "react";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { compose, Dispatch } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { DialogsInitialStateType, dialogsReducerAtions } from "../../redux/dialogs-reducer";

type MapStateToPropsType = {
  dialogsPage: DialogsInitialStateType;
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
      dispatch(dialogsReducerAtions.sendMessage(newMessageBody));
    },
  };
};

export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
