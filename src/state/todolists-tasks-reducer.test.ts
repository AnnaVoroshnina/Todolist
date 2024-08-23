import {TypeForTodolist} from "../App";
import {ActionAddTodolist, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test ('ids should be equals', () => {
    const startTaskState = {}
    const startTodolistState: Array<TypeForTodolist> = []

    const titleNeTodolist = 'new todolist'
    const todolistId =  v1()

    const action = ActionAddTodolist({title: titleNeTodolist, todolistId: todolistId})
    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFromTask = keys[0]

    const idFromTodolist = endTodolistState[0].id

    expect(idFromTask).toEqual(todolistId)
    expect(idFromTodolist).toEqual(todolistId)

})