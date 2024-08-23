import {TypeFilterValue, TypeForTodolist} from "../App";
import {v1} from "uuid";
import {createAction, createReducer} from "@reduxjs/toolkit";

export const ActionRemoveTodolist = createAction<{
    id: string
}>('REMOVE-TODOLIST');

export const ActionAddTodolist = createAction<{
    title: string
    todolistId: string
}>('ADD-TODOLIST');

export const ActionChangeTitleTodolist = createAction<{
    id: string
    title: string
}>('CHANGE-TITLE-TODOLIST');

export const ActionChangeFilterTodolist = createAction<{
    id: string
    filter: TypeFilterValue
}>('CHANGE-FILTER-TODOLIST');

export const todolistId1 = v1()
export const todolistId2 = v1()
const initialState: Array<TypeForTodolist> = [
    {id: todolistId1, title: "What to learn?", filter: 'all'},
    {id: todolistId2, title: "What to buy?", filter: 'all'}]


export const todolistsReducer = createReducer(
    initialState,
    (builder) => {
        builder.addCase(ActionRemoveTodolist, (state, action) => {
            return state.filter(tl => tl.id !== action.payload.id)
        })
        builder.addCase(ActionAddTodolist, (state, action) => {
            state.unshift({
                id: action.payload.todolistId,
                title: action.payload.title,
                filter: 'all'
            })
        })
        builder.addCase(ActionChangeTitleTodolist, (state, action) => {
            const changeTitle = state.find(todolist => todolist.id === action.payload.id);
            if (changeTitle) {
                changeTitle.title = action.payload.title
            }
        })
        builder.addCase(ActionChangeFilterTodolist, (state, action) => {
            const indexTodolistFilter = state.findIndex(todolist => todolist.id === action.payload.id)
            state[indexTodolistFilter].filter = action.payload.filter
        })
    })


