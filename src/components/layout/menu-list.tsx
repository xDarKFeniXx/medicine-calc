import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import {NavLink} from "react-router-dom";

export const mainListItems = (
    <div>
        <ListItem button
                  key="createBill"
                  component={NavLink} to="/">
            <ListItemIcon>

                <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Create Bill" />
        </ListItem>
        <ListItem button
                  key="billPositions"
                  component={NavLink} to="/billPositions">
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="bill positions" />
        </ListItem>

        <ListItem button
                  key="patients"
                  component={NavLink} to="/patients">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Patients" />
        </ListItem>

    </div>
);

