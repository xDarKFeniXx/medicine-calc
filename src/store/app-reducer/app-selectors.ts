import {AppStateType} from "../store";


export const notificationsSelector=(state:AppStateType)=>state.app.notifications
export const loadingStatusSelector=(state:AppStateType)=>state.app.loading
