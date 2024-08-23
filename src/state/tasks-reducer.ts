import {TypeTasksObj} from "../App";
import {TypeTask} from "../сomponents/Todolist/Todolist";
import {v1} from "uuid";
import {
    ActionAddTodolist,
    ActionRemoveTodolist,
    todolistId1,
    todolistId2,
} from "./todolists-reducer";
import {createAction, createReducer} from "@reduxjs/toolkit";

export const ActionRemoveTask = createAction<{
    todolistId: string
    taskId: string
}>('REMOVE-TASK');

export const ActionAddTask = createAction<{
    title: string
    todolistId: string
}>('ADD-TASK');

export const ActionChangeStatusTask = createAction<{
    todolistId: string
    taskId: string
    isDone: boolean
}>('CHANGE-STATUS-TASK');

export const ActionChangeTitleTask = createAction<{
    todolistId: string
    taskId: string
    title: string
}>('CHANGE-TITLE-TASK');


const initialState: TypeTasksObj = {
    [todolistId1]: [ /*Заключаем в кв. скобки так как хотим чтобы здесь содержались данные, а не название свойства*/
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Bread', isDone: true},
    ]
}
export const tasksReducer = createReducer(
    initialState,
    (builder) => {
        builder.addCase(ActionRemoveTask, (state, action) => {
            let tasks = state[action.payload.todolistId]
            state[action.payload.todolistId] = tasks.filter(task => task.id !== action.payload.taskId)
        })
        builder.addCase(ActionAddTask, (state, action) => {
            let newTask: TypeTask = {id: v1(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId] = [newTask, ...state[action.payload.todolistId]]
        })
        builder.addCase(ActionChangeStatusTask, (state, action) => {
            let tasksStatus = state[action.payload.todolistId]
            state[action.payload.todolistId] = tasksStatus
                .map(task => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.isDone}
                    : task)
        })
        builder.addCase(ActionChangeTitleTask, (state, action) => {
            const tasksTitle = state[action.payload.todolistId]
            state[action.payload.todolistId] = tasksTitle
                .map(task => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title}
                    : task)
        })
        builder.addCase(ActionAddTodolist, (state, action) => {
            state[action.payload.todolistId] = []
        })
        builder.addCase(ActionRemoveTodolist, (state, action) => {
            delete state[action.payload.id]
        })
    })
