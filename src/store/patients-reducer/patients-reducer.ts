import { patientsApi } from "../../api/firebase-api"


const initialState={
    loading: true,
    patients: [] as Array<PatientType>
}
export type PatientType={
    id: string
    name: string
}
export type PatientsReducerStateT=typeof initialState
const SET_PATIENTS_INITIAL_INFO='categories/SET_PATIENTS_INITIAL_INFO'
const patientsReducer=(state=initialState, action:patientsActionTypes):PatientsReducerStateT=>{
    switch(action.type){
        case SET_PATIENTS_INITIAL_INFO:{
            return {...state, loading: false, patients: action.payload}
        }
        default:
            return state
    }
}
type SetPatientsActionType={
    type: typeof SET_PATIENTS_INITIAL_INFO
    payload:Array<PatientType>
}
const setPatientsAction=(patients:Array<PatientType>):SetPatientsActionType=>({
    type: SET_PATIENTS_INITIAL_INFO,
    payload: patients
})
export const getPatientsThunk=()=>{
    return async  (dispatch:any)=>{
        const data= await patientsApi.getPatients()

        dispatch(setPatientsAction(data))
    }
}


export type patientsActionTypes=SetPatientsActionType
export default patientsReducer
