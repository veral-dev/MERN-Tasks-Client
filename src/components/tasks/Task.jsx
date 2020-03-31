import React, { useContext } from 'react'
import TaskContext from '../../context/Tasks/TaskContext'
import ProjectContext from '../../context/projects/ProjectContext'


const Task = ({ task }) => {

    //Extraer la funcion de borrar tarea desde el context
    const tasksContext = useContext(TaskContext)
    const { deleteTask, getTasks, updateTask, setActualTask } = tasksContext

    //Extraer si un proyecto esta activo
    const projectsContext = useContext(ProjectContext)
    const { project } = projectsContext

    //Extrer el proyecto
    const [actualProject] = project


    //Funcion de eliminar tarea
    const taskDelete = id => {
        deleteTask(id, actualProject._id)
        getTasks(actualProject._id)
    }

    //Funcion que modifica el estado de la tarea
    const changeState = task => {
        task.state = !task.state

        updateTask(task)
    }

    //Agrega una tarea actual para que se pueda editar
    const taskSelection = task => {
        setActualTask(task)
    }


    return (

        <li className="tarea sombra">

            <p>{task.name}</p>

            <div className="estado">
                {task.state ?
                    (<button type="button" className="completo" onClick={() => changeState(task)}>Completado</button>)
                    : (<button type="button" className="incompleto" onClick={() => changeState(task)}>Incompleto</button>)}
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => taskSelection(task)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => taskDelete(task._id)}
                >Eliminar</button>
            </div>
        </li>

    );
}

export default Task;