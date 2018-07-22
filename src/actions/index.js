import firebase from "firebase";
import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    //action creator is returning the function and calling it with the dispatch method
    //which sends the actions to the reducers

    let user = null;

    return async (dispatch) => {
        dispatch({ type: LOGIN_USER });

        try {
            user = await firebase.auth().signInWithEmailAndPassword(email, password);
            loginUserSuccess(dispatch, user);
        } catch (e) {
            try {
                user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                loginUserSuccess(dispatch, user);
            } catch (e) {
                dispatch({ type: LOGIN_USER_FAIL });
            }
        }
    };
};



/*    
    return (dispatch) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(() => {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
        })
        .then(user => {
            dispatch({type: LOGIN_USER_SUCCESS, payload: user})
        })
        .catch(() => {
            dispatch({type: LOGIN_USER_FAIL})
        })
    }
};

        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loginUserSuccess(dispatch, user))
                .catch(() => loginUserFail(dispatch));
        });
    };
};
*/
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};