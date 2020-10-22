import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';
import { removeErrorMsg, setErrorMsg } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    //el useSelector nos sirve para sacar el estado de la store (creo)
    const {msgError} = useSelector( state => state.ui);

    const [{name, email, password, password2}, handleInputChange] = useForm({
        name: 'Manuel',
        email: 'ejemplos@gmail.com',
        password: '123456',
        password2: '123456',
    })

    const handleRegister = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch( startRegisterWithEmailPasswordName(email, password, name));
        }

    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(setErrorMsg('Name is required'));
            return false;
        }

        if(!validator.isEmail(email)){
            dispatch(setErrorMsg('Email is not valid'));
            return false;
        }

        if(password !== password2 || password.length < 6){
            dispatch(setErrorMsg('Passwords are different or are too short'));
            return false;
        }

        dispatch(removeErrorMsg());
        return true;
    }

    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>

            {   
                msgError
                &&
                (
                    <div className="auth__alert-error">
                        {msgError}
                    </div>
                )
            }


            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}

                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}

                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}

                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                    
                </Link>
            </form>
        </>
    )
}
