import React, { useReducer } from 'react'

import TaskContext from './TaskContext'
import TaskReducer from './TaskReducer'

import { TASKS_PROJECT, ADD_TASK, TASK_VALIDATION, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK, CLEAN_TASK } from '../../types'
import clientAxios from '../../config/axios'

const TaskState = props => {
    const initialState = {
        tasksProject: [],
        errorTask: false,
        taskSelected: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    //Crear las funciones

    //Obtener las tareas de un proyecto
    const getTasks = async project => {

        try {
            //eslint-disable-next-line
            const result = await clientAxios.get('/api/tasks', { params: { project } })
            // console.log(result)
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const addTask = async task => {
        try {
            //eslint-disable-next-line
            const result = await clientAxios.post('/api/tasks', task)
            // console.log(result)
            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Valida y muestra un error
    const taskValidation = () => {
        dispatch({
            type: TASK_VALIDATION
        })
    }

    //Borrar tarea por id
    const deleteTask = async (id, project) => {
        try {
            await clientAxios.delete(`/api/tasks/${id}`, { params: { project } });
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }

    }

    //Editar tarea
    const updateTask = async task => {
        try {
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task);
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error);
        }

    }

    //Extrae la tarea para edición
    const setActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    //Elimina (limpia) la tarea seleccionada
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
                tasksProject: state.tasksProject,
                errorTask: state.errorTask,
                taskSelected: state.taskSelected,
                getTasks,
                addTask,
                taskValidation,
                deleteTask,
                setActualTask,
                updateTask,
                cleanTask
            }}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState