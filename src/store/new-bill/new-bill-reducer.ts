import {BillPositionType} from "../bill-positions/bill-positions-reducer";
import {CategoryType} from "../categories-reducer/categories-reducer";

const initialState={
    createDate: "",
    patientId:"",
    patientName: "",
    positions:[] as Array<BillPositionType>,
    categories: [] as Array<CategoryType>,
    sum: 0,
    discount: 0,
    doctorName: "",
    doctorId: ""
}
export interface BillI{
    createDate: string
    patientId:string
    patientName:string
    positions:Array<BillPositionType>
    categories: Array<CategoryType>
    sum: number|string
    discount: number|string
    doctorName: string
    doctorId: string
    id?:string
}
const ADD_START_INFO="newBill/ADD_START_INFO"
const CHANGE_ELEMENT="newBill/CHANGE_ELEMENT"
const CHANGE_COUNT="newBill/CHANGE_COUNT"
const CHANGE_DISCOUNT="newBill/CHANGE_DISCOUNT"
const RESET_BILL="newBill/RESET_BILL"
const newBillReducer=(state=initialState, action:NewBillReducerActionTypes):BillI=>{
    switch (action.type){
        case ADD_START_INFO:{
            return {...state, ...action.payload}
        }
        case CHANGE_ELEMENT:{
            return {...state, [action.payload.name]:action.payload.value}
        }
        case CHANGE_COUNT:{

                const oldArray=[...state.positions]
                const indexNewItem=oldArray.findIndex(item=>item.id===action.payload.id)
                const newItem={...oldArray[indexNewItem]}
                if(newItem.count===0&&!action.payload.isIncrement){
                    return state
                }
                newItem.count=action.payload.isIncrement? newItem.count+1:newItem.count-1
                const newArray=[...oldArray.slice(0, indexNewItem), newItem, ...oldArray.slice(indexNewItem+1)]
                // @ts-ignore
            let newSum=0
            newArray.forEach(item=>{
                newSum=newSum+(+item.count*+item.price)
            })
            // @ts-ignore
            newSum=newSum*(1-(state.discount/100)).toFixed(2)
            // const newSum=newArray.reduce((acc:number, cur)=>acc+(+cur.price*+cur.count))
            // @ts-ignore
            return {...state, positions:newArray, sum:newSum}
        }
        case CHANGE_DISCOUNT:{
            // @ts-ignore
            return {...state, discount:action.payload, sum:state.sum*(1-+action.payload/100).toFixed(2)}
        }
        case RESET_BILL:{
            return initialState
        }
        default:
            return state
    }
}

type AddStartDataActionType={
    type: typeof ADD_START_INFO
    payload: {doctorId:string, doctorName:string, categories:Array<CategoryType>, positions:Array<BillPositionType>, createDate:string}
}
export const addStarDataAction=(doctorId:string,
                                doctorName:string,
                                categories:Array<CategoryType>,
                                positions:Array<BillPositionType>,
                                createDate:string

):AddStartDataActionType=>({
    type: ADD_START_INFO,
    payload: {doctorId, doctorName, categories, positions, createDate}
})
type ChangeElementActionType={
    type: typeof CHANGE_ELEMENT
    payload: {name:string, value:string}
}
export const changeElementAction=(name:string, value:string):ChangeElementActionType=>({
    type: CHANGE_ELEMENT,
    payload:{name, value}
})
type ChangeCountActionType={
    type:typeof CHANGE_COUNT
    payload: {id:string, isIncrement:boolean}
}
export const changeCountAction=(id:string, isIncrement:boolean)=>({
    type: CHANGE_COUNT,
        payload:{id, isIncrement}
})
type ChangeDiscountActionType={
    type:typeof CHANGE_DISCOUNT
    payload:number|string
}
export const changeDiscountAction=(discount:number|string)=>({
    type: CHANGE_DISCOUNT,
    payload:discount
})
type ResetBillActionType={
    type: typeof RESET_BILL
}
export const resetBillAction=()=>({
 type: RESET_BILL
})
export default newBillReducer
export type NewBillReducerActionTypes=AddStartDataActionType|ChangeElementActionType|ChangeCountActionType|ChangeDiscountActionType|ResetBillActionType
