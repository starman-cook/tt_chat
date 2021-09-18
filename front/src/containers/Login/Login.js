import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormElement from '../../components/FormElement/FormElement'
import './Login.css'
import { loginUser } from '../../store/users/userActions'
import { push } from 'connected-react-router'
import { NavLink } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const [state, setstate] = useState({
        email: '',
        password: ''
    })
    const error = useSelector(state => state.users.loginError)

    const inputChangeHandler = e => {
        const { name, value } = e.target
        setstate(prevState => {
            return { ...prevState, [name]: value }
        })
    }
    const submitFormHandler = async event => {
        event.preventDefault()
        console.log(state)
        await dispatch(loginUser(state))
    }
    const closeHandler = () => {
        dispatch(push('/'))
    }
    return (
        <div className="Login">
            <div className="flex-center">
                <h2 className="Login__title">Authorization</h2>
            </div>
            {error && <span className="FormElement__error_message" >{error.error}</span>}
            <form className="Login__form" onSubmit={submitFormHandler} >
                <FormElement
                    placeholder="email"
                    label="email"
                    onChange={inputChangeHandler}
                    name="email"
                    value={state.workEmail}
                    required
                />
                <FormElement
                    placeholder="Password"
                    label="Password"
                    onChange={inputChangeHandler}
                    name="password"
                    value={state.password}
                    required
                    type="password"
                />
                <div className="flex-center">
                    <button className="Login__btn" type="submit">Enter</button>
                </div>
                <div className='flex-end'>Don't have an account? <NavLink className='Login__navlink' to='/register'>Sign up</NavLink></div>
            </form>
        </div>
    )
}

export default Login
