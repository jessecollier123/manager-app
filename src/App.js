import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createStackNavigator } from 'react-navigation';
import firebase from 'firebase';
//import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';


class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyC7O0RY34EWTKtQpvFsI32siUiPo2KkqCs',
            authDomain: 'manager-dcaa9.firebaseapp.com',
            databaseURL: 'https://manager-dcaa9.firebaseio.com',
            projectId: 'manager-dcaa9',
            storageBucket: '',
            messagingSenderId: '28913109114'
          };

          firebase.initializeApp(config);
    }
}

const AppNavigator = createStackNavigator({
    Home: { screen: LoginForm }
});

const middleware = [ReduxThunk];

const mapStateToProps = (state) => {
    return {
        navigationState: state.navigationState,
    };
};

const AppWithState = connect(mapStateToProps)(App);

const store = createStore(reducers, {}, applyMiddleware(...middleware));

const Root = () => {
    return (
        <Provider store={store}>
            <AppWithState />
        </Provider>
    );
};

export default Root;