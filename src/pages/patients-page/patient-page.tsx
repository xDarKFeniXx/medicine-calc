import React from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {patientByIdSelector} from "../../store/patients-reducer/patients-selector";
import {useHistory} from 'react-router-dom'
import {allBillsSelector} from "../../store/bills-reducer/bills-selectors";
import {Button} from "@material-ui/core";
import {deletePatientThunk} from "../../store/patients-reducer/patients-reducer";

export const PatientPage = () => {
    const history=useHistory()
    const dispatch=useDispatch()
    // @ts-ignore
    const {id}=useParams()
    // @ts-ignore
    const patient=useSelector(state=>patientByIdSelector(state, id))
    // @ts-ignore
    const bills=useSelector(allBillsSelector)
    const billsList=bills.filter(bill=>bill.patientId===id).map(bill=><div key={bill.id}>{bill.createDate}-{bill.sum}</div>)
const handleDelete=()=>{
        dispatch(deletePatientThunk(id))
        history.push('/patients')
}
    return (
        <div>
            {/*@ts-ignore*/}
            {patient.name}
            <Button
                variant="outlined"
                onClick={handleDelete}
            >
                delete patient
            </Button>
            {billsList}
        </div>
    );
};

