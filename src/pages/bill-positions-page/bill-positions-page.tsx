import React from 'react';
import {useSelector} from "react-redux";
import {billPositionsSelector} from "../../store/bill-positions/bill-positions-selectors";

export const BillPositionsPage = () => {
    const billPositions=useSelector(billPositionsSelector)

    const list=billPositions.map(item=><div>{item.name}</div>)
    return (
        <div>
            {list}
        </div>
    );
};

