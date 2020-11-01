import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from '../../store/store';
import Notifier from '../notifier/notifier';
import {AppWithStoreAndRouter} from "./app-with-store-and-router";
import theme from '../../theme/theme'


function App() {
    const notistackRef = React.createRef();
    const onClickDismiss =( key:any) => () => {
        // @ts-ignore
        notistackRef.current.closeSnackbar(key);

    }
  return (
      <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>

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
            </ThemeProvider>
        </BrowserRouter>
      </Provider>
  );
}

export default App;
