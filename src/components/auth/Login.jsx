import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {

    //Extraer los valores del context alert
    const alertContext = useContext(AlertContext)
    const { alert, showAlert } = alertContext

    const authContext = useContext(AuthContext)
    const { message, auth, LogIn } = authContext

    //En caso de que el password o usuario no exista
    useEffect(() => {
        if (auth) {
            props.history.push('/proyectos')
        }
        if (message) {
            showAlert(message.msg, message.category)
        }
        //eslint-disable-next-line
    }, [message, auth, props.history])

    //State para inicio de sesión
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    //Extraer usuario

    const { email, password } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Validar campos
        if (email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error')
        }
        //Pasarlo a action
        LogIn({ email, password })
    }


    return (
        <div className="form-usuario">
            {alert ?
                (<div className={`alerta ${alert.category}`}>{alert.msg}</div>)
                : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Tu contraseña" value={password} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>



                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">¿No tienes cuenta? Registrate</Link>
            </div>
        </div>
    );
}

export default Login;