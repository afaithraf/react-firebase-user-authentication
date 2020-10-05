import firebaseconfig from './index'
import firebase from 'firebase'

export const authMethods = {

    signupWithEmail: (email, password, setErrors, setToken) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            //make res asynchronous so that we can make grab the token before saving it.
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b
                //set token to localStorage 
                await localStorage.setItem('token', token)
                //grab token from local storage and set to state. 
                setToken(window.localStorage.token)
                console.log(res)
            })
            .catch(err => {
                console.error(err);
                setErrors(prev => ([...prev, err.message]))
            })
    },
    signinWithEmail: (email, password, setErrors, setToken) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b
                await localStorage.setItem('token', token)
                setToken(window.localStorage.token)
                console.log(res)
            })
            .catch(err => {
                setErrors(prev => ([...prev, err.message]))
            })
    },
    signout: (setErrors, setToken) => {
        firebase.auth().signOut().then(res => {
                //remove the token
                localStorage.removeItem('token')
                //set the token back to original state
                setToken(null)
            })
            .catch(err => {
                setErrors(prev => ([...prev, err.message]))
                //whether firebase does the trick or not i want my user to do there thing.
                localStorage.removeItem('token')
                setToken(null)
                console.error(err.message)
            })
    },

}