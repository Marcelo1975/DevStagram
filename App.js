import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Reducers from './src/Reducers';

import Preload from './src/screens/Preload';
import Tabs from './src/screens/Tabs';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';

console.disableYellowBox = true;

let store = createStore(Reducers, applyMiddleware(ReduxThunk));

const AppNavigator = createStackNavigator({
  Preload:{
    screen:Preload
  },
  Tabs:{
    screen:Tabs
  },
  Login:{
    screen:Login
  },
  SignUp:{
    screen:SignUp
  }
}, {
  defaultNavigationOptions:{
    header:null
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}