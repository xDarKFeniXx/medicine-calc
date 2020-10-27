import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getUserInfo} from "../store/auth-reducer/auth-reducer";
import {getCategoriesThunk} from "../store/categories-reducer/categories-reducer";
import {getBillPositionsThunk} from "../store/bill-positions/bill-positions-reducer";
import {getPatientsThunk} from "../store/patients-reducer/patients-reducer";

export const useInitializeHook=()=>{
    const [loading, setLoading] = useState(true)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getUserInfo())
        dispatch(getCategoriesThunk())
        dispatch(getBillPositionsThunk())
        dispatch(getPatientsThunk())
        if(loading){
            setLoading(false)
        }

    }, [dispatch, loading])
    return {loading}
}
