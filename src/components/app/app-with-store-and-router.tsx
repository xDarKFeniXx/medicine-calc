import React from 'react';
import { Link } from 'react-router-dom';
import {useRoutes} from "../../routes";
import {Dashboard} from "../layout/dashboard";

export const AppWithStoreAndRouter = () => {
    const routes=useRoutes()
    return (
        // <div>
        //     <header>
        //         <nav>
        //             <li><Link to='/'>Create bill</Link></li>
        //             <li><Link to='/patients'>Patients</Link></li>
        //             <li><Link to='/billPositions'>billPositions</Link></li>
        //             <li><Link to='/profile'>profile</Link></li>
        //         </nav>
        //     </header>
        //     {routes}
        // </div>
        <Dashboard>
            {routes}
        </Dashboard>
    );
};

