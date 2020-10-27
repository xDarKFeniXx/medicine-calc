import React from 'react';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from '../../store/store';
import {AppWithStoreAndRouter} from "./app-with-store-and-router";

function App() {
  return (
      <Provider store={store}>
        <BrowserRouter>
            <AppWithStoreAndRouter/>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
