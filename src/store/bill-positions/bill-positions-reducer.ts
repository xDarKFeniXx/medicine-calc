import {billPositionsApi} from "../../api/firebase-api";


const initialState={
    loading: true,
    billPositions: [] as Array<BillPositionType>
}
export type BillPositionType={
    id: string
    name: string
    price: number
    categoryId: string
    count: number
}
export type BillPositionsReducerStateT=typeof initialState
const SET_BILL_POSITIONS_INITIAL_INFO='categories/SET_BILL_POSITIONS_INITIAL_INFO'
const billPositionsReducer=(state=initialState, action:billPositionsActionTypes):BillPositionsReducerStateT=>{
    switch(action.type){
        case SET_BILL_POSITIONS_INITIAL_INFO:{
            return {...state, loading: false, billPositions: action.payload}
        }
        default:
            return state
    }
}
type SetBillPositionsActionType={
    type: typeof SET_BILL_POSITIONS_INITIAL_INFO
    payload:Array<BillPositionType>
}
const setBillPositionsAction=(billPositions:Array<BillPositionType>):SetBillPositionsActionType=>({
    type: SET_BILL_POSITIONS_INITIAL_INFO,
    payload: billPositions
})
export const getBillPositionsThunk=()=>{
    return async  (dispatch:any)=>{
        const data= await billPositionsApi.getBillPositions()

        dispatch(setBillPositionsAction(data))
    }
}


export type billPositionsActionTypes=SetBillPositionsActionType
export default billPositionsReducer
