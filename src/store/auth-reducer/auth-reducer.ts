import { Dispatch } from "redux";
import {authApi} from "../../api/firebase-api";
import {addNotificationAction, NotificationTypeEnum} from "../app-reducer/app-reducer";


const initialState={
    isAuth:false,
    id: null as string|null,
    name :null as string|null,
    medicPosition: null as string|null,
    access: null as string|null
}

export interface AuthReducerStateT {
    isAuth?:boolean,
    id: string|null,
    name :string|null,
    medicPosition: string|null,
    access: string|null
}
const SET_USER_INFO = "auth/SET_USER_INFO"
const LOGOUT = "auth/LOGOUT"

const authReducer=(state=initialState, action:AuthReducerActionTypes):AuthReducerStateT=>{
    switch (action.type){
        case SET_USER_INFO: {
            return {...state,
                ...action.payload,
                isAuth: true}
        }
        case LOGOUT: {
            return {...initialState}
        }
        default:
            return state
    }
}

type SetUserInfoActionType={
    type: typeof SET_USER_INFO
    payload: AuthReducerStateT
}
const setUserInfoAction=(user: AuthReducerStateT) => ({
    type: SET_USER_INFO,
    payload: user
})
type LogOutActionType={
    type: typeof LOGOUT
}
const logOutAction= () => ({
    type: LOGOUT
})
export const getUserInfo = ()=> {
    return async (dispatch: Dispatch<any>) => {

//@ts-ignore
        const user:Promise<AuthReducerStateT> = await authApi.getCurrentUserInfo()
        if(user){
            dispatch(setUserInfoAction(await user))
        }

    }
}
export const loginActionCreator = (email: string, password: string) => {

    return async (dispatch: Dispatch<any>) => {
        await authApi.login(email, password)
        dispatch(getUserInfo())
    }
}
export const logOutActionCreator = () => {
    return async (dispatch: Dispatch<any>) => {
        await authApi.logout()
        dispatch(logOutAction())
    }
}
export const updateUserInfoThunk=(name:string, medicPosition:string)=>async (dispatch:any)=>{
    await authApi.updateUserInfo(name, medicPosition)
    dispatch(addNotificationAction({message: "Вы успешно обновили данные", type: NotificationTypeEnum.SUCCESS}))
    dispatch(getUserInfo())
}
export type AuthReducerActionTypes=SetUserInfoActionType|LogOutActionType
export default authReducer
