import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect, } from "react-router-dom";
import { firebase } from '../firebase/firebaseConfig';

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from './AuthRouter';
import { login } from "../actions/auth";
import { Spinner } from "../components/auth/Spinner";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLogged, setIsLogged] = useState(false);

    //este efecto sirve para conseguir los datos del usuario, y que no se pierdan al recargar la página
    useEffect(() => {
        firebase.auth().onAuthStateChanged( (user) => {
            if(user?.uid){
                dispatch( login(user.uid, user.displayName ));
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }

            setChecking(false);
        })
    }, [dispatch]);


    if(checking){
        return <Spinner />
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLogged}
                    />
            
                    <PrivateRoute
                        exact
                        isAuthenticated={isLogged}
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login"/>
                </Switch>
            </div>
        </Router>
    )
}
