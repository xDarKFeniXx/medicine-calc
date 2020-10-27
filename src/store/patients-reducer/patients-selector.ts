import {AppStateType} from "../store";


export const patientsSelector=(state:AppStateType)=>state.patients.patients
export const patientByIdSelector=(state:AppStateType, id:string)=>state.patients.patients.find(p=>p.id===id)
