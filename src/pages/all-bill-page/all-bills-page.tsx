import React from 'react';
import {useSelector} from "react-redux";
import { allBillsSelector } from '../../store/bills-reducer/bills-selectors';

export const AllBillsPage = () => {

    const allBills=useSelector(allBillsSelector)
    const allBillsList=allBills.map(bill=>{
        return(
            <div key={bill.id}>{bill.sum}</div>
        )
    })
    return (
        <div>
            {allBillsList}
        </div>
    );
};

