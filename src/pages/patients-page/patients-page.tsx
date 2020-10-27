import React from 'react';
import {useSelector} from "react-redux";
import {patientsSelector} from "../../store/patients-reducer/patients-selector";

export const PatientsPage = () => {
    const patients=useSelector(patientsSelector)

    const list=patients.map(p=><div>{p.name}</div>)
    return (
        <div>
            {list}
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>
            <div>f</div>

        </div>
    );
};

