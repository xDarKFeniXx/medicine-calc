import React, {useEffect} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import {Redirect, Route, Switch} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../store/auth-reducer/auth-selectors";
import {ProfilePage} from "../pages/profile-page/profile-page";
import {NotFoundPage} from "../pages/not-found-page/not-found-page";
import {PatientsPage} from "../pages/patients-page/patients-page";
import {BillPositionsPage} from "../pages/bill-positions-page/bill-positions-page";
import {PatientPage} from "../pages/patients-page/patient-page";
import {CreateBillPage} from "../pages/create-bill-page/create-bill-page";
import {AllBillsPage} from '../pages/all-bill-page/all-bills-page';
import {LoginPage} from "../pages/auth-page/login-page";
import {RegisterPage} from '../pages/auth-page/register-page';
import {loadingStatusSelector} from "../store/app-reducer/app-selectors";
import {LoadingStatus, setLoadedAction, setLoadingAction} from "../store/app-reducer/app-reducer";
import {getUserInfo} from "../store/auth-reducer/auth-reducer";
import {getCategoriesThunk} from "../store/categories-reducer/categories-reducer";
import {getBillPositionsThunk} from "../store/bill-positions/bill-positions-reducer";
import {getPatientsThunk} from "../store/patients-reducer/patients-reducer";
import {getBillsThunk} from "../store/bills-reducer/bills-reducer";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export const useRoutes = () => {
    // const {loading}=useInitializeHook()
    const loading=useSelector(loadingStatusSelector)
    const currentUser=useSelector(currentUserSelector)
    const dispatch=useDispatch()
    const classes=useStyles()
    useEffect(()=>{
        if(loading===LoadingStatus.NEVER){
            dispatch(setLoadingAction())
            dispatch(getUserInfo())
            dispatch(getCategoriesThunk())
            dispatch(getBillPositionsThunk())
            dispatch(getPatientsThunk())
            dispatch(getBillsThunk())
            dispatch(setLoadedAction())
        }
    }, [dispatch, loading])
    if(loading===LoadingStatus.LOADING){
        return(
            <Backdrop className={classes.backdrop} open={true} >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }
    // @ts-ignore
    if(!currentUser.isAuth){
        return(
            <Switch>
                <Route exact path='/'>
                    <Redirect to="/login" />
                </Route>
                <Route path="/login">
                    <LoginPage/>
                </Route>
                <Route path="/registration">
                    <RegisterPage/>
                </Route>
                <Route path='*'>
                    <NotFoundPage/>
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route exact path='/'>
                <CreateBillPage/>
            </Route>

            <Route path='/billPositions'>
                <BillPositionsPage/>
            </Route>

            <Route path='/patients/:id'>
                <PatientPage/>
            </Route>
            <Route path='/patients'>
                <PatientsPage/>
            </Route>
            <Route path='/bills'>
                <AllBillsPage/>
            </Route>
            <Route path='/profile'>
                <ProfilePage/>
            </Route>
            <Route path="/login">
                <Redirect to="/"/>
            </Route>
            <Route path='*'>
                <NotFoundPage/>
            </Route>
        </Switch>
    );
};

