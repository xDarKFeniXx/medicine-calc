import React from 'react';
import { useParams } from 'react-router-dom';
import {useSelector} from "react-redux";
import {patientByIdSelector} from "../../store/patients-reducer/patients-selector";

import {userBillByIdSelector} from "../../store/bills-reducer/bills-selectors";

export const PatientPage = () => {
    // @ts-ignore
    const {id}=useParams()
    // @ts-ignore
    const patient=useSelector(state=>patientByIdSelector(state, id))
    const bills=useSelector(state=>userBillByIdSelector(state, id))
    return (
        <div>

        </div>
    );
};

