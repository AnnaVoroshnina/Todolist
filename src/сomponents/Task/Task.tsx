import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TypeTask} from "../Todolist/Todolist";

type TypeTaskProps = {
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    task: TypeTask
    todolistId: string
}
export const Task = React.memo((props: TypeTaskProps) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId)
    const changeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todolistId)
        console.log(props.task.id, event.currentTarget.checked)
    }
    const changeTitleHandler = useCallback( (editableTitle: string) => {
        if (!editableTitle) return
        props.changeTaskTitle(props.task.id, editableTitle, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            onChange={changeStatusHandler}
            checked={props.task.isDone}
        />
        <EditableSpan title={props.task.title} onChange={changeTitleHandler}/>
        <IconButton onClick={onRemoveHandler} aria-label="delete" color="primary">
            <Delete/>
        </IconButton>

    </li>
})