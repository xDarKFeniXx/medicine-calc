import {AppStateType} from "../store";


export const userBillByIdSelector=(state:AppStateType, patientId:string)=>state.bills.filter(bill=>bill.patientId=patientId)

export const allBillsSelector=(state:AppStateType)=>state.bills
