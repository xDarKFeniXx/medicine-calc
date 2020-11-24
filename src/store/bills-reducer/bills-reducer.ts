import { billsApi } from "../../api/firebase-api";
import {BillI} from "../new-bill/new-bill-reducer";

const initialState=[] as Array<BillI>

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
    dispatch(setBillsAction(data||[]))
}
export const addNewBillThunk=(newBill:BillI)=>async (dispatch:any)=>{
    const data=await billsApi.addNewBill(newBill)
    dispatch(getBillsThunk())
}
export const deleteBillThunk=(id:string)=>async (dispatch:any)=>{
    const data =await billsApi.deleteBill(id)
    dispatch(getBillsThunk())
}
export default billsReducer
export type BillsReducerActionTypes=SetBillsActionType
