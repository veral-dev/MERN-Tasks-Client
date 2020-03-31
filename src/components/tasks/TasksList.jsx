import React, { useContext } from 'react'
import Task from './Task'
import projectContext from '../../context/projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const TasksList = () => {

    //Extraer proyectos de state inicial
    const projectsContext = useContext(projectContext)
    const { project, deleteProject } = projectsContext

    //Obtener las tareas del proyecto
    const tasksContext = useContext(TaskContext)
    const { tasksProject } = tasksContext
    // console.log(tasksProject)
    //Si no hay proyecto seleccionado
    if (!project) return <h2>Selecciona un proyecto</h2>

    //Array destructuring
    const [actualProject] = project

    //Eliminar proyecto
    const onClickDelete = () => {
        deleteProject(actualProject._id)
    }



    return (
        <>
            <h2>Proyecto: {actualProject.name}</h2>

            <ul className="listado-tareas">
                {tasksProject.length === 0
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tasksProject.map(task =>
                            <CSSTransition
                                key={task._id}
                                timeout={200}
                                classNames="tarea">
                                <Task task={task} />
                            </CSSTransition>)}
                    </TransitionGroup>
                }
            </ul>

            <button type="button" className="btn btn-eliminar" onClick={onClickDelete}>Eliminar Proyecto &times;</button>
        </>
    );
}

export default TasksList;