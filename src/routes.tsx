import React from 'react';
import {useInitializeHook} from "./hooks/initialize-hook";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import {Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "./store/auth-reducer/auth-selectors";
import {loginActionCreator} from "./store/auth-reducer/auth-reducer";
import {ProfilePage} from "./pages/profile-page/profile-page";
import {NotFoundPage} from "./pages/not-found-page/not-found-page";
import {PatientsPage} from "./pages/patients-page/patients-page";
import {BillPositionsPage} from "./pages/bill-positions-page/bill-positions-page";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const useRoutes = () => {
    const {loading}=useInitializeHook()
    const currentUser=useSelector(currentUserSelector)
    const dispatch=useDispatch()
    const classes=useStyles()
    const handleLogin=()=>{
        dispatch(loginActionCreator('m@mail.ru', '123456'))
    }
    if(loading){
        return(
            <Backdrop className={classes.backdrop} open={true} >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    // @ts-ignore
    if(!currentUser.isAuth){
        return(
            <button onClick={handleLogin}>войти</button>
        )
    }
    return (
        <Switch>
            <Route exact path='/'>
                <div>create bill</div>
            </Route>

            <Route path='/billPositions'>
                <BillPositionsPage/>
            </Route>
            <Route path='/patients'>
                <PatientsPage/>
            </Route>
            <Route path='/profile'>
                <ProfilePage/>
            </Route>
            <Route path='*'>
                <NotFoundPage/>
            </Route>
        </Switch>
    );
};

