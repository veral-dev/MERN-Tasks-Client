import { TASKS_PROJECT, ADD_TASK, TASK_VALIDATION, DELETE_TASK, ACTUAL_TASK, UPDATE_TASK, CLEAN_TASK } from '../../types'

export default (state, action) => {
    switch (action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                tasksProject: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                tasksProject: [action.payload, ...state.tasksProject],
                errorTask: false,
            }
        case TASK_VALIDATION:
            return {
                ...state,
                errorTask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                taskSelected: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                taskSelected: null
            }
        default:
            return state
    }
}