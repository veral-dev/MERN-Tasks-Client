import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'


const SignUp = (props) => {

    //Extraer los valores del context alert
    const alertContext = useContext(AlertContext)
    const { alert, showAlert } = alertContext

    const authContext = useContext(AuthContext)
    const { message, auth, userRegister } = authContext

    //En caso de que el usuario se haya logueado o registrado anteriormente
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
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    //Extraer usuario

    const { name, email, password, confirmPassword } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Validar campos vacios
        if (name.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error')
            return
        }
        //Contraseña con mínimo 6 caracteres
        if (password.length < 6) {
            showAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error')
            return
        }
        //Contraseñas iguales en confirmar
        if (password !== confirmPassword) {
            showAlert('Las contraseñas no coinciden', 'alerta-error')
            return
        }
        //Pasarlo a action
        userRegister({ name, email, password })

    }


    return (
        <div className="form-usuario">
            {alert ?
                (<div className={`alerta ${alert.category}`}>{alert.msg}</div>)
                : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear nueva cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="text">Nombre</label>
                        <input type="text" id="name" name="name" placeholder="Nombre" value={name} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Correo electrónico</label>
                        <input type="email" id="email" name="email" placeholder="Correo electrónico" value={email} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" name="password" placeholder="Tu contraseña" value={password} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Confirmar contraseña</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Tu contraseña" value={confirmPassword} onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarse" />
                    </div>



                </form>
                <Link to={'/'} className="enlace-cuenta">Volver al inicio de sesión</Link>
            </div>
        </div>
    );
}

export default SignUp;