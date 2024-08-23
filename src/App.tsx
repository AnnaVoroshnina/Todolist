import './App.css';
import {Todolist, TypeTask} from "./сomponents/Todolist/Todolist";
import {AddItemForm} from "./сomponents/AddItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {TypeAppRootState} from "./state/store";
import {useCallback} from "react";
import {ActionAddTask, ActionChangeStatusTask, ActionChangeTitleTask, ActionRemoveTask} from "./state/tasks-reducer";
import {
    ActionAddTodolist,
    ActionChangeFilterTodolist,
    ActionChangeTitleTodolist,
    ActionRemoveTodolist
} from "./state/todolists-reducer";
import {v1} from "uuid";

export type TypeFilterValue = 'all' | 'active' | 'completed'
export type TypeForTodolist = {
    id: string
    title: string
    filter: TypeFilterValue
}
export type TypeTasksObj = {
    [key: string]: Array<TypeTask>
}

function App() {
    //Извлекаем данные из глобального стейт. Используем хук useSelector. Указываем тип данных это стейта,
    //Через запятую тип данных, которые извлекаем.
    //В скобках указываем колбэк, в котором выбираем нужный стейт.
    const todolists = useSelector <TypeAppRootState, Array<TypeForTodolist>>(state => state.todolists);
    const tasksObj = useSelector <TypeAppRootState, TypeTasksObj>(state => state.tasks)

    const dispatch = useDispatch()

    const addTask = useCallback((titleNewTask: string, todolistId: string) => {
        const action = ActionAddTask({title: titleNewTask, todolistId})
        dispatch(action)
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = ActionRemoveTask({todolistId, taskId: id})
        dispatch(action)
    }, [])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        const action = ActionChangeStatusTask({todolistId, taskId, isDone})
        dispatch(action)
    }, [])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(ActionChangeTitleTask({todolistId, taskId, title: newTitle}))
    }, [])

    const changeTodolistTitle = useCallback((newTitleTodolist: string, todolistId: string)=> {
        dispatch(ActionChangeTitleTodolist({id: todolistId, title: newTitleTodolist}))
    }, [])

    const filterTask = useCallback((value: TypeFilterValue, todolistId: string)=> {
        dispatch(ActionChangeFilterTodolist({id: todolistId, filter: value}))
    }, [])

    const removeTodolist = useCallback((todolistId: string) => {
        const action = ActionRemoveTodolist({id: todolistId})
        dispatch(action)
    }, [])

    //кеширование функции, чтобы при перерисовке не создавать новую
    const addTodolist = useCallback ((title: string) => {
        const action = ActionAddTodolist({title, todolistId: v1()})
        dispatch(action)
    }, [])
    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{paddingBlock:'25px'}}>
                    <AddItemForm placeholder={'Новый список задач'} addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={2}>
                    {todolists.map((tl) => {
                        let taskForTodolist = tasksObj[tl.id]
                        return <Grid item>
                            <Paper style={{padding:'20px'}}>
                                <Todolist
                                    key={tl.id}
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={taskForTodolist}
                                    removeTask={removeTask}
                                    filterTask={filterTask}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
