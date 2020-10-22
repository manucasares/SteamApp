import Swal from 'sweetalert2';
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./ui";


export const startLoginEmailPassword = (email, password ) => {
    
    //pongo loading en true
    
    return (dispatch) => {
        
        dispatch( startLoading() ) ;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                );
                dispatch( finishLoading() );
            })
            //pongo loading en false
            .catch( (err) => {
                dispatch( finishLoading() );
                console.log(err);
                Swal.fire('Error', err.message, 'error')
            })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                await user.updateProfile({
                    displayName: name
                })

            })
            .catch( err => {
                console.log(err);
                Swal.fire('Error', err.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
            .then(({user}) => {
                dispatch( login(user.uid, user.displayName) );
            })

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() );
    }
}

export const logout = () => ({
    type: types.logout
})


