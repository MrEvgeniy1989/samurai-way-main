import React, { ChangeEvent, FC, useEffect, useState } from "react";

export const ProfileStatusWithHooks: FC<ProfileStatusWithHooksPropsType> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  useEffect(() => {
    setNewStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deActivateEditMode = () => {
    setEditMode(false);
    updateStatus(newStatus);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewStatus(e.currentTarget.value);
  };
  return (
    <div>
      {!editMode ? (
        <div>
          <b>Status: </b> <span onDoubleClick={activateEditMode}>{status || "------"}</span>
        </div>
      ) : (
        <div>
          <input onChange={onStatusChange} value={newStatus} onBlur={deActivateEditMode} autoFocus />
        </div>
      )}
    </div>
  );
};

// Types
type ProfileStatusWithHooksPropsType = {
  status: string;
  updateStatus: (status: string) => void;
};
