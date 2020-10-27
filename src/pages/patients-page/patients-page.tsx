import React from 'react';
import {useSelector} from "react-redux";
import {patientsSelector} from "../../store/patients-reducer/patients-selector";
import {ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Link } from 'react-router-dom';

export const PatientsPage = () => {
    const patients=useSelector(patientsSelector)

    const list=patients.map(p=> {
            return(
                <ListItem
                    button key={p.id}
                    component={Link} to={`/patients/${p.id}`}
                >
                    <ListItemText primary={p.name} />
                </ListItem>
            )})
    return (


            <List component="nav" aria-label="main mailbox folders">
                {list}
            </List>

    );
};

