import React, { useReducer } from 'react'

import projectContext from './ProjectContext'
import projectReducer from './ProjectReducer'
import { FORM_PROJECT, GET_PROJECTS, ADD_PROJECT, FORM_VALIDATION, ACTUAL_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from '../../types'

import clientAxios from '../../config/axios'


const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        errorForm: false,
        project: null,
        message: null,
    }
    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState)

    //Serie de funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    const getProjects = async () => {
        try {
            const result = await clientAxios.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })

        } catch (error) {
            const alert = {
                msg: 'Hubo un error al obtener los proyectos',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    //Agregar nuevo proyecto
    const addProject = async project => {
        try {
            const result = await clientAxios.post('/api/projects', project)
            //Inserta el proyecto en el state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error al añadir el proyecto',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }

    }

    //Validar formulario
    const showError = () => {
        dispatch({
            type: FORM_VALIDATION,
        })
    }

    //Selecciona el proyecto que el usuario hace clic
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })

    }

    //Elimina un proyecto
    const deleteProject = async projectId => {
        try {
            await clientAxios.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })

        } catch (error) {
            const alert = {
                msg: 'Hubo un error al borrar el proyecto',
                category: 'alerta-error'
            }

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider value={{
            projects: state.projects,
            form: state.form,
            errorForm: state.errorForm,
            project: state.project,
            message: state.message,
            showForm,
            getProjects,
            addProject,
            showError,
            actualProject,
            deleteProject,
        }}>
            {props.children}
        </projectContext.Provider>
    )

}

export default ProjectState