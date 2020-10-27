import { billsApi } from "../../api/firebase-api";
import {BillPositionType} from "../bill-positions/bill-positions-reducer";

const initialState=[] as Array<BillI>
export interface BillI{
    id: string
    createDate: string
    patientId:string
    positions:Array<BillPositionType>
    sum: string|number
    sale: string|number
}
const SET_BILLS="bills/SET_BILLS"
const billsReducer=(state=initialState, action:BillsReducerActionTypes):Array<BillI>=>{
    switch (action.type){
        case SET_BILLS:{
            return [...action.payload]
        }
        default:
            return state
    }
}
type SetBillsActionType={
    type: typeof SET_BILLS
    payload :Array<BillI>
}
export const setBillsAction=(data:Array<BillI>):SetBillsActionType=>({
    type:SET_BILLS,
    payload:data
})
export const getBillsThunk=()=>async (dispatch:any)=>{
    const data =await billsApi.getBills()
    dispatch(setBillsAction(data))
}
export const addNewBillThunk=(newBill:BillI)=>async (dispatch:any)=>{

}
export default billsReducer
export type BillsReducerActionTypes=SetBillsActionType
