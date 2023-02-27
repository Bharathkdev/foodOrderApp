import React from 'react';
import Navigation from './src/navigation/Navigation';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import cartReducer from './src/store/reducer/CartReducer';

const rootReducer = combineReducers({
  data: cartReducer,
});

const store = configureStore({reducer: rootReducer});

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
