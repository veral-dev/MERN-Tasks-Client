import React, { useContext, useEffect } from 'react'
import Project from './Project'
import projectContext from '../../context/projects/ProjectContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AlertContext from '../../context/alert/alertContext'

const ProjectsList = () => {

    //Extraer proyectos de state inicial
    const projectsContext = useContext(projectContext)
    const { message, projects, getProjects } = projectsContext

    const alertContext = useContext(AlertContext)
    const { alert, showAlert } = alertContext
    // Obtener proyectos cuando carga el componente
    useEffect(() => {

        if (message) {
            showAlert(message.msg, message.category)
        }
        getProjects()

        //eslint-disable-next-line
    }, [message])


    //Revisar si projects tiene contenido
    if (projects.length === 0) return <p>No hay proyectos, crea uno para empezar</p>


    return (
        <ul className="listado-proyectos">
            {alert ? (<div className={`alerta ${alert.category}`} > {alert.msg}</div>) : null
            }
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto">
                        <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ProjectsList;