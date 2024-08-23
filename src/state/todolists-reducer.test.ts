import {v1} from "uuid";
import {TypeFilterValue, TypeForTodolist} from "../App";
import {
    ActionAddTodolist, ActionChangeFilterTodolist, ActionChangeTitleTodolist,
    ActionRemoveTodolist,
    todolistsReducer,
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TypeForTodolist> = [
        {id: todolistId1, title: "What to learn?", filter: 'all'},
        {id: todolistId2, title: "What to buy?", filter: 'all'}
    ]

    const endState: Array<TypeForTodolist> = todolistsReducer(
        startState, ActionRemoveTodolist({id: todolistId1}));

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2);
})
test('correct todolist should be added', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newTodolistTitle = 'New Todolist';
    const todolistId =  v1()

    const startState: Array<TypeForTodolist> = [
        {id: todolistId1, title: "What to learn?", filter: 'all'},
        {id: todolistId2, title: "What to buy?", filter: 'all'}
    ]

    const endState: Array<TypeForTodolist> = todolistsReducer(
        startState, ActionAddTodolist({title: newTodolistTitle, todolistId: todolistId}));

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
})

test('correct todolist should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newTitleTodolist = 'New title Todolist';

    const startState: Array<TypeForTodolist> = [
        {id: todolistId1, title: "What to learn?", filter: 'all'},
        {id: todolistId2, title: "What to buy?", filter: 'all'}
    ]

    const endState: Array<TypeForTodolist> = todolistsReducer(
        startState, ActionChangeTitleTodolist({id: todolistId2, title: newTitleTodolist}));

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(startState[0].title);
    expect(endState[1].title).toBe(newTitleTodolist);
})
test('correct filter todolist should changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    let newFilter: TypeFilterValue = 'completed';

    const startState: Array<TypeForTodolist> = [
        {id: todolistId1, title: "What to learn?", filter: 'all'},
        {id: todolistId2, title: "What to buy?", filter: 'all'}
    ]

    const endState: Array<TypeForTodolist> = todolistsReducer(
        startState, ActionChangeFilterTodolist({id: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe(startState[0].filter);
    expect(endState[1].filter).toBe(newFilter);
})
