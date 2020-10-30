import React from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {patientByIdSelector} from "../../store/patients-reducer/patients-selector";

import {allBillsSelector} from "../../store/bills-reducer/bills-selectors";

export const PatientPage = () => {
    // @ts-ignore
    const {id}=useParams()
    // @ts-ignore
    const patient=useSelector(state=>patientByIdSelector(state, id))
    // @ts-ignore
    const bills=useSelector(allBillsSelector)
    const billsList=bills.filter(bill=>bill.patientId===id).map(bill=><div key={bill.id}>{bill.createDate}-{bill.sum}</div>)

    return (
        <div>
            {/*@ts-ignore*/}
            {patient.name}
            {billsList}
        </div>
    );
};

