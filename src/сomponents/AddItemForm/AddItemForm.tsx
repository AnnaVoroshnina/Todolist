import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {Button, Fab, TextField} from "@mui/material";
import {Add} from "@mui/icons-material";

type AddItemFormsProps = {
    addItem: (titleNewTask: string) => void
    placeholder: string
}

export const AddItemForm = React.memo ((props: AddItemFormsProps) => {
    const [titleNewTask, setTitleNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const newTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitleNewTask(event.currentTarget.value)
    }
    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
        if (setError !== null){
            setError(null)
        }
    }
    const addTask = () => {
        if (!titleNewTask.trim()) {
            setError('Заполните поле')
        } else {
            props.addItem(titleNewTask.trim())
        }
        setTitleNewTask('')
    }

    return <div className={'editableSpan'}>
        <TextField
            label={error ? 'error' : props.placeholder}
            value={titleNewTask}
            onChange={newTitleChangeHandler}
            onKeyDown={onKeyDown}
            type="text"
            error={!!error}
            helperText = {error}
        />
        <Fab onClick={addTask} size="small" color="primary" aria-label="add" >
            <Add />
        </Fab>
    </div>
})