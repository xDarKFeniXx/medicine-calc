export enum LoadingStatus {
    LOADING="LOADING",
    LOADED="LOADED",
    NEVER="NEVER"
}
const initialState={
    notifications: [] as Array<NotificationI>,
    loading:LoadingStatus.NEVER
}
export type AppReducerStateT=typeof initialState
export interface NotificationI{
    key? :number|string
    type:NotificationTypeEnum
    message:string
}

export enum NotificationTypeEnum{
    SUCCESS='success',
    ERROR='error',
    INFO='info',
    WARNING='warning'

}

const ADD_NOTIFICATION='app/ADD_NOTIFICATION'
const CLOSE_NOTIFICATION='app/CLOSE_NOTIFICATION'
const LOADING='app/LOADING'
const LOADED='app/LOADED'
const appReducer=(state=initialState, action:AppReducerActionTypes):AppReducerStateT=>{
    switch (action.type){
        case ADD_NOTIFICATION:{
            return {...state, notifications: [...state.notifications, {...action.payload, key:new Date().getTime() + Math.random()}]}
        }
        case CLOSE_NOTIFICATION:{
            const oldArray=state.notifications
            const newArray=oldArray.filter(not=>not.key!==action.payload)
            return {...state, notifications: newArray}
        }
        case LOADED:{
            return {...state, loading: LoadingStatus.LOADED}
        }
        case LOADING:{
            return {...state, loading: LoadingStatus.LOADING}
        }
        default:
            return state
    }
}
type AddNotificationActionType={
    type: typeof ADD_NOTIFICATION
    payload: NotificationI
}
export const addNotificationAction= (notification: NotificationI)=>({
    type: ADD_NOTIFICATION,
    payload: notification
})
type CloseNotificationActionType={
    type: typeof CLOSE_NOTIFICATION
    payload: number|string
}
export const closeNotificationAction=(key:string|number)=>({
    type: CLOSE_NOTIFICATION,
    payload :key
})
export const setLoadingAction=()=>({
    type: LOADING
})
export const setLoadedAction=()=>({
    type:LOADED
})

export default appReducer
export type AppReducerActionTypes=CloseNotificationActionType|AddNotificationActionType|
    {type: typeof LOADED}|{type: typeof LOADING}
