import React, {useCallback} from "react";
import {TypeFilterValue} from "../../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "../Task/Task";

export type TypeTask = {
    id: string;
    title: string;
    isDone: boolean;
}
type TypeProps = {
    id: string
    title: string;
    tasks: Array<TypeTask>
    filterTask: (value: TypeFilterValue, todolistId: string) => void
    addTask: (titleNewTask: string, todolistId: string) => void
    filter: TypeFilterValue
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (newTitleTodolist: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
}
//создаем контейнерную компоненту
export const Todolist = React.memo((props: TypeProps) => {
    const filterAllClickHandler = useCallback(() => props.filterTask('all', props.id), [props.filterTask, props.id])
    const filterActiveClickHandler = useCallback(() => props.filterTask('active', props.id), [props.filterTask, props.id])
    const filterCompletedClickHandler = useCallback(() => props.filterTask('completed', props.id), [props.filterTask, props.id])

    const removeClickTodolist = () => props.removeTodolist(props.id)
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodolistTitleHandler = useCallback((newTitleTodolist: string) => {
        if (!newTitleTodolist) return
        props.changeTodolistTitle(newTitleTodolist, props.id)
    }, [props.changeTodolistTitle, props.id])

    let taskForTodolist =  props.filter === 'completed'
        ? props.tasks.filter(e => e.isDone === false)
        : (props.filter === 'active')
            ? props.tasks.filter(e => e.isDone === true)
            : props.tasks


    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                <IconButton onClick={removeClickTodolist} aria-label="delete" color="primary">
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm placeholder={'Новая задача'} addItem={addTask}/>
            <ul>
                {taskForTodolist.map(task => <Task
                    task={task}
                    changeTaskTitle={props.changeTaskTitle}
                    changeTaskStatus={props.changeTaskStatus}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={task.id}
                />)}
            </ul>
            <footer>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                        onClick={filterAllClickHandler}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'contained' : 'text'}
                        onClick={filterActiveClickHandler}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'contained' : 'text'}
                        onClick={filterCompletedClickHandler}>Completed
                </Button>
            </footer>
        </div>
    )
})
