import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CreateIcon from '@material-ui/icons/Create';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles((theme) => ({
    paddingIcon: {
        paddingLeft: 16,
        paddingRight: 16,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 12,
            paddingRight: 12
        }
    }
}))
export const MainListItems = () => {
    const classes=useStyles()
    return (
        <div>
            <ListItem button
                      key="createBill"
                      component={NavLink} to="/"
                      className={classes.paddingIcon}
            >
                <ListItemIcon>

                    <CreateIcon/>
                </ListItemIcon>
                <ListItemText primary="Create Bill"/>
            </ListItem>
            <ListItem button
                      className={classes.paddingIcon}
                      key="billPositions"
                      component={NavLink} to="/billPositions">
                <ListItemIcon>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="bill positions"/>
            </ListItem>

            <ListItem button
                      className={classes.paddingIcon}
                      key="patients"
                      component={NavLink} to="/patients">
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Patients"/>
            </ListItem>
            <ListItem button
                      className={classes.paddingIcon}
                      key="bills"
                      component={NavLink} to="/bills">
                <ListItemIcon>
                    <ViewListIcon/>
                </ListItemIcon>
                <ListItemText primary="all bills"/>
            </ListItem>
        </div>

    )
}

