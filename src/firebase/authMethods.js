import firebaseconfig from './index'
import firebase from 'firebase'


export const authMethods = {
    sendPasswordReset: (email) => {
        firebase.auth().sendPasswordResetEmail(email).then(function () {
            console.log("reset email sent");
        }).catch((error) => {
            console.log("err", error);
        });
    },
    verifyEmail: () => {
        firebase.auth().currentUser.sendEmailVerification()
            .then(function () {
                console.log("Verification email sent");
            })
            .catch(function (error) {
                console.log("err", error);
            });
    },
    signupWithEmail: async (setToken, setUser, email, password) => {
        let response;
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            //make res asynchronous so that we can make grab the token before saving it.
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b
                //set token to localStorage 
                await localStorage.setItem('token', token)
                //grab token from local storage and set to state. 
                setToken(window.localStorage.token)
                setUser(res.user)
                console.log("auth token and user set")
                response = res;
            })
            .catch(err => {
                throw (err);
            })
        return response;
    },
    signinWithEmail: async (setToken, setUser, email, password) => {
        let response;
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async res => {
                const token = await Object.entries(res.user)[5][1].b
                await localStorage.setItem('token', token)
                setToken(window.localStorage.token)
                setUser(res.user)
                console.log("auth token and user set")
                response = res;
            })
            .catch(err => {
                throw (err);
            })
        return response;
    },
    signout: async (setToken, setUser) => {
        await firebase.auth().signOut().then(res => {
                //remove the token
                localStorage.removeItem('token')
                //set the token back to original state
                setToken(null)
                setUser(null)
            })
            .catch(err => {
                //whether firebase does the trick or not i want my user to do there thing.
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)
                throw (err)
            })
        return true;
    },
    signInWithProvider: async (setToken, setUser, provider) => {
        let response, authProvider;
        switch (provider) {
            case "facebook":
                authProvider = new firebase.auth.FacebookAuthProvider();
                break;

            case "google":
                authProvider = new firebase.auth.GoogleAuthProvider();
                break;

            default:
                throw (new Error("no provider spiecified"));
        }
        await firebase.auth().signInWithPopup(authProvider)
            .then(
                async (res) => {
                    // var token = res.credential.accessToken;
                    const token = await Object.entries(res.user)[5][1].b
                    await localStorage.setItem('token', token)
                    setToken(window.localStorage.token)
                    setUser(res.user)
                    console.log("auth token and user set")
                    response = res;
                })
            .catch(err => {
                throw (err);
            });
        return response;
    },
    getCurrentUser: (setToken, setUser) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                localStorage.removeItem('token')
                setToken(null)
                setUser(null)
            }
        });
    }

}