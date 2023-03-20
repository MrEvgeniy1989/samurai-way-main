import React from 'react';

type ProfileStatusPropsType = {
  status: string
}

type ProfileStatusStateType = {
  editMode: boolean
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType, ProfileStatusStateType> {

  state = {
    editMode: false
  }

  activateEditMode() {
    this.setState({
      editMode: true
    })
  }
  deActivateEditMode() {
    this.setState({
      editMode: false
    })
  }

  render() {

    return (
      <div>
        {!this.state.editMode
          ? <div>
            <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
          </div>
          :
          <div>
            <input value={this.props.status} onBlur={this.deActivateEditMode.bind(this)} autoFocus/>
          </div>
        }
      </div>
    )

  }
}