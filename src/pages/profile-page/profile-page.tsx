import React from 'react';
import {useSelector} from "react-redux";
import {currentUserSelector} from "../../store/auth-reducer/auth-selectors";

export const ProfilePage = () => {
    const currentUser=useSelector(currentUserSelector)

    return (
        <div>
            {/*@ts-ignore*/}
            {currentUser.name}
        </div>
    );
};

