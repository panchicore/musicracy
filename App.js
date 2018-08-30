import React, {Component} from 'react';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {AppNavigator} from './navigation'
import {store, persistor} from './redux/store'
import {PARSE_APP_ID, PARSE_JS_KEY} from './settings'

import {updateUser} from './redux/actions'

let Parse = require('parse/react-native');
let TAG = "[app]";

import {AsyncStorage} from 'react-native';

Parse.setAsyncStorage(AsyncStorage);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
        Parse.serverURL = 'https://pg-app-lzoagneuq2whd20dydh73d78ushz1a.scalabl.cloud/1/';

        console.log(TAG, store.getState());

        if(!store.getState().user.username){
            store.dispatch(updateUser())
        }
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppNavigator />
                </PersistGate>
            </Provider>
        );
    }
}
