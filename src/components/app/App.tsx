import Button from '@material-ui/core/Button';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from '../../store/store';
import Notifier from '../notifier/notifier';
import {AppWithStoreAndRouter} from "./app-with-store-and-router";

function App() {
    const notistackRef = React.createRef();
    const onClickDismiss =( key:any) => () => {
        // @ts-ignore
        notistackRef.current.closeSnackbar(key);

    }
  return (
      <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider
                // @ts-ignore
                ref={notistackRef}
                action={(key) => (
                    <Button onClick={onClickDismiss(key)}>
                        &times;
                    </Button>
                )}
            >
                <Notifier/>
            <AppWithStoreAndRouter/>
            </SnackbarProvider>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
