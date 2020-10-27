import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./auth-reducer/auth-reducer";
import thunkMiddleware from "redux-thunk";
import categoriesReducer from "./categories-reducer/categories-reducer";
import patientsReducer from "./patients-reducer/patients-reducer";
import billPositionsReducer from "./bill-positions/bill-positions-reducer";
import billsReducer from "./bills-reducer/bills-reducer";
import appReducer from "./app-reducer/app-reducer";

const rootReducer=combineReducers({
    auth: authReducer,
    categories:categoriesReducer,
    patients: patientsReducer,
    billPositions: billPositionsReducer,
    bills:billsReducer,
    app:appReducer
})

export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunkMiddleware)))

// window.__store__ = store

export type dispatchType = typeof store.dispatch
export default store;
