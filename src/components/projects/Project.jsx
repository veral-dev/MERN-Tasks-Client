import React, { useContext } from 'react'
import ProjectContext from '../../context/projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'


const Project = ({ project }) => {

    //Obtener el state de proyectos
    const projectsContext = useContext(ProjectContext)
    const { actualProject } = projectsContext


    //Obtener la función del context de tarea
    const tasksContext = useContext(TaskContext)
    const { getTasks } = tasksContext

    //Funcion para agregar el proyecto actual
    const projectSelection = id => {
        actualProject(id) //Fijar un proyecto actual
        getTasks(id) //Filtrar las tareas cuando se hace clic
    }


    return (
        <li><button
            type="button"
            className="btn btn-blank"
            onClick={() => projectSelection(project._id)}
        >{project.name}</button></li>
    );
}

export default Project;