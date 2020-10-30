import React from 'react';
import {useRoutes} from "../../routes/routes";
import {Dashboard} from "../layout/dashboard";

export const AppWithStoreAndRouter = () => {
    const routes=useRoutes()
    return (
        <Dashboard>
            {routes}
        </Dashboard>
    );
};

