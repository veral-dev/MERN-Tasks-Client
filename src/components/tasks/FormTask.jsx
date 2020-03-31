import React, { useContext, useState, useEffect } from 'react'
import ProjectContext from '../../context/projects/ProjectContext'
import TaskContext from '../../context/Tasks/TaskContext'

const FormTask = () => {

    //Extraer si un proyecto esta activo
    const projectsContext = useContext(ProjectContext)
    const { project } = projectsContext

    //Extraer la funcion agregar tarea desde el context
    const tasksContext = useContext(TaskContext)
    const { taskSelected, errorTask, addTask, taskValidation, getTasks, updateTask, cleanTask } = tasksContext

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (taskSelected !== null) {
            setTask(taskSelected)
        } else {
            setTask({ name: '' })
        }

    }, [taskSelected])

    //State del formulario
    const [task, setTask] = useState({
        name: '',
    })

    //Extraer el nombre del proyecto
    const { name } = task

    //Si no hay proyecto seleccionado
    if (!project) return null

    //Array destructuring
    const [actualProject] = project

    //Leer los valores del formulario
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault()

        //Validar
        if (name.trim() === '') {
            taskValidation()
            return
        }
        //Comprobar si es edición o nueva tarea
        if (taskSelected === null) {
            //Agregar la nueva tarea al state de tareas
            task.project = actualProject._id
            addTask(task)
        } else {
            //Actualizar tarea existente
            updateTask(task)
            //Limpia tarea seleccionada del state
            cleanTask()
        }
        //Obtener y filtrar las tareas del proyecto actual
        getTasks(actualProject._id)

        //Reiniciar el Form
        setTask({
            name: ''
        })
    }

    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={taskSelected ? 'Editar Tarea' : 'Agregar Tarea'} />
                </div>
            </form>

            {errorTask ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
}

export default FormTask;