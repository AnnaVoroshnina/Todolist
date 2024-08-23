import {v1} from "uuid";
import {TypeTasksObj} from "../App";
import {
    ActionAddTask, ActionChangeStatusTask, ActionChangeTitleTask,
    ActionRemoveTask,
    tasksReducer
} from "./tasks-reducer";
import {ActionRemoveTodolist} from "./todolists-reducer";

test('correct task should be removed', () => {
    const todolistId1 = v1()
    const  todolistId2 = v1()

    const startState:TypeTasksObj = {
        [todolistId1]: [ /*Заключаем в кв. скобки так как хотим чтобы здесь содержались данные, а не название свойства*/
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
        ]
    }

    const endState: TypeTasksObj = tasksReducer(
        startState, ActionRemoveTask({todolistId: todolistId1, taskId:'1'}));

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].id).toBe('2');
    expect(endState[todolistId1].every(task => task.id !== '1')).toBeTruthy()
})
test('correct task should be added', () => {
    const todolistId1 = v1()
    const  todolistId2 = v1()

    const titleNewTask: string = 'New Task'

    const startState:TypeTasksObj = {
        [todolistId1]: [ /*заключаем в кв скобки так как хотим чтобы здесь содержались данные, а не название свойства*/
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
        ]
    }

    const endState = tasksReducer(
        startState, ActionAddTask({title: titleNewTask, todolistId: todolistId1}))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toBe(titleNewTask);
})
test('correct status task should changed', () => {
    const todolistId1 = v1()
    const  todolistId2 = v1()

    const startState:TypeTasksObj = {
        [todolistId1]: [ /*заключаем в кв скобки так как хотим чтобы здесь содержались данные, а не название свойства*/
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
        ]
    }

    const endState: TypeTasksObj = tasksReducer(
        startState, ActionChangeStatusTask({todolistId: todolistId2, taskId: '1', isDone: false}));

    expect(endState[todolistId1].length).toBe(4)
    expect(endState[todolistId2][0].isDone).toBe(false);
    expect(endState[todolistId1][0].isDone).toBe(true);

})
test('correct title of task should changed', () => {
    const todolistId1 = v1()
    const  todolistId2 = v1()

    const newTitle: string = 'New title of Todolist'

    const startState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
        ]
    }

    const endState = tasksReducer(
        startState, ActionChangeTitleTask({todolistId: todolistId2, taskId: '2', title: newTitle}));

    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][1].title).toBe('JS');
    expect(endState[todolistId2][1].title).toBe(newTitle);
})
test('property with todolistId should be deleted', () => {
    const todolistId1 = v1()
    const  todolistId2 = v1()

    const startState = {
        [todolistId1]: [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false},
            {id: '4', title: 'Redux', isDone: false}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Bread', isDone: true},
        ]
    }
    const action = ActionRemoveTodolist({id:todolistId1})
    const endState = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(1)
    expect(endState[todolistId1]).toBeUndefined();

})
