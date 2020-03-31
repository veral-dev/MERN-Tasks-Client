import React, { useState, useContext } from 'react'
import projectContext from '../../context/projects/ProjectContext'




const NewProject = () => {

    //Obtener el state del formulario
    const projectsContext = useContext(projectContext)
    const { form, errorForm, showForm, addProject, showError } = projectsContext

    //State para proyecto
    const [project, setProject] = useState({
        name: '',
    })

    //Extraer nombre del proyecto
    const { name } = project

    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProject = e => {
        e.preventDefault()
        //Validar el proyecto
        if (name === '') {
            showError()
            return
        }
        //Agregar al state
        addProject(project)
        //Reiniciar el form
        setProject({ name: '' })
    }


    return (
        <>
            <button
                type="button"
                className="btn btn-primario btn-block"
                onClick={() => showForm()}
            >
                Nuevo proyecto</button>


            {form ?
                (<form className="formulario-nuevo-proyecto" onSubmit={onSubmitProject}>
                    <input type="text" className="input-text" placeholder="Nombre del proyecto" name="name" onChange={onChangeProject} value={name} />
                    <input type="submit" className="btn btn-block btn-primario" value="Agregar proyecto" />
                </form>)
                : null}

            {errorForm ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null}
        </>
    );
}

export default NewProject;