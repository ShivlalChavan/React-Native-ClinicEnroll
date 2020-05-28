/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStore,combineReducers, applyMiddleware} from 'redux';
import { Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import patientReducer from './store/reducers/patient';
import medicineReducer from  './store/reducers/medicine';
import reasonReducer from './store/reducers/reason';
import AppNavigator from './navigation/AppNavigator'; 


const rootReducer = combineReducers({
  auth: authReducer,
  patient: patientReducer,
  medicine: medicineReducer,
  reason: reasonReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  
 export default function App() {
  
  return (
  <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}
