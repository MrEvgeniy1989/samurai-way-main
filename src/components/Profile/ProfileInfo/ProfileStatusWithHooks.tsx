import React, {ChangeEvent, FC, useEffect, useState} from "react";

type ProfileStatusWithHooksPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatusWithHooks: FC<ProfileStatusWithHooksPropsType> = ({status, updateStatus}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [newStatus, setNewStatus] = useState<string>(status)

    useEffect(() => {
        if (status !== newStatus)
            setNewStatus(status)
    }, [status])

    const deActivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus)
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewStatus(e.currentTarget.value)
    }
    return (
        <div>
            {
                !editMode
                    ? <div>
                        <b>Status: </b> <span onDoubleClick={activateEditMode}>{status || '------'}</span>
                    </div>
                    : <div>
                        <input onChange={onStatusChange} value={newStatus} onBlur={deActivateEditMode} autoFocus/>
                    </div>
            }
        </div>
    )
}