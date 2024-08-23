import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type TypeEditableSpanProps = {
    title: string
    onChange: (editableTitle: string) => void
}

export const EditableSpan = React.memo ((props: TypeEditableSpanProps) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let activeEditMode = ()=> {
        setEditMode(true)
        setEditableTitle(props.title)
    }
    let activeViewMode = ()=> {
        setEditMode(false)
        props.onChange(editableTitle)
    }

    const [editableTitle, setEditableTitle] = useState('')
    const editableTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(event.currentTarget.value)
    }
    return editMode
        ? <TextField onBlur={activeViewMode} value={editableTitle} onChange={editableTitleChangeHandler} autoFocus/>
        : <span onDoubleClick={activeEditMode}>{props.title}</span>

})