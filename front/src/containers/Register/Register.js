import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormElement from '../../components/FormElement/FormElement'
import './Register.css'
import { registerUser } from '../../store/users/userActions'
import { NavLink } from 'react-router-dom'
import FileInput from "../../components/FileInput/FileInput"
import {initMessages} from "../../store/messages/messageActions"

const Register = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        email: '',
        username: '',
        avatar: null,
        password: ''
    })
    const error = useSelector(state => state.users.registerError)
    const getError = fieldName => {
        try{
            return error.errors[fieldName].message
        }catch(e){
            return undefined
        }
    }
    const inputChangeHandler = e => {
        const { name, value } = e.target
        setState(prevState => {
            return { ...prevState, [name]: value }
        })
    }
    const submitFormHandler = async event => {
        event.preventDefault()
        const formData = new FormData();
        Object.keys(state).forEach((key) => {
            formData.append(key, state[key])
        });
        await dispatch(registerUser(formData))
    }

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState((prevState) => ({
            ...prevState,
            [name]: file,
        }))
    }

    useEffect(() => {
        dispatch(initMessages())
    }, [])

    return (
        <div className="Register">
            <div className="flex-center">
                <h2 className="Register__title">Registration</h2>
            </div>
            <form className="Register__form" onSubmit={submitFormHandler} >
                <FormElement
                    placeholder="email"
                    label="email"
                    onChange={inputChangeHandler}
                    name="email"
                    value={state.email}
                    required
                    error={getError('email')}
                />
                <FormElement
                    placeholder="Nickname"
                    label="username"
                    onChange={inputChangeHandler}
                    name="username"
                    value={state.username}
                    required
                    error={getError('username')}
                />
                <FormElement
                    placeholder="Password"
                    label="password"
                    onChange={inputChangeHandler}
                    name="password"
                    type="text"
                    value={state.password}
                    required
                    error={getError('password')}
                />
                <FileInput
                    name="avatar"
                    placeholder="Avatar image"
                    onChange={fileChangeHandler}
                />
                <div className="flex-center">
                    <button className="Register__btn" type="submit">Register</button>
                </div>
                <div className='flex-end'>Already have an account? <NavLink className='Register__navlink' to='/login'>Login</NavLink></div>
            </form>
        </div>
    )
}

export default Register
