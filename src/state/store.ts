import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

//общий рутовый редюсер
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
//автоматическое определение типа редьюсеров, на основе того, что возвращает rootReducer
export type TypeAppRootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer
})


// @ts-ignore
window.store = store