import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'


const Bar = () => {

    //Extraer la información de auth
    const authContext = useContext(AuthContext)
    const { user, userAuth, LogOut } = authContext

    useEffect(() => {
        userAuth()
        //eslint-disable-next-line
    }, [])



    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.name}</span></p> : null}

            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => LogOut()}
                >
                    Cerrar Sesión
                </button>
            </nav>
        </header>
    );
}

export default Bar;