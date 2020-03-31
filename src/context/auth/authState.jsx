import React, { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'

import clientAxios from '../../config/axios'
import tokenAuth from '../../config/token'


import { REGISTER_OK, REGISTER_ERROR, GET_USER, LOGIN_OK, LOGIN_ERROR, CLOSE_SESSION } from '../../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        message: null,
        loading: true,
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const userRegister = async data => {

        try {
            const response = await clientAxios.post('/api/users', data)
            // console.log(response.data)
            dispatch({
                type: REGISTER_OK,
                payload: response.data
            })
            //Obtener usuario
            userAuth()

        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: REGISTER_ERROR,
                payload: alert
            })
        }
    }

    //Retorna el usuario autenticado
    const userAuth = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            //Función para enviar el token por headers
            tokenAuth(token)
        }


        try {
            const response = await clientAxios.get('/api/auth')
            // console.log(response)
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            // console.log(error.response)
            dispatch({
                type: LOGIN_ERROR,
            })
        }

    }

    const LogIn = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data)

            dispatch({
                type: LOGIN_OK,
                payload: response.data
            })
            //Obtener usuario
            userAuth()

        } catch (error) {
            // console.log(error.response.data.msg)
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    //Cerrar sesión
    const LogOut = () => {
        dispatch({
            type: CLOSE_SESSION
        })
    }


    return (

        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                loading: state.loading,
                userRegister,
                LogIn,
                userAuth,
                LogOut,
            }}>
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthState