import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {patientsSelector} from "../../store/patients-reducer/patients-selector";
import {ListItemText} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { addPatientThunk } from '../../store/patients-reducer/patients-reducer';

export const PatientsPage = () => {
    const patients=useSelector(patientsSelector)
    const dispatch=useDispatch()
const [newPatientName, setNewPatientName] = useState("")
    const handleChange=(e:any)=>{
        setNewPatientName(e.target.value)
    }
    const list=patients.map(p=> {
            return(
                <ListItem
                    button key={p.id}
                    component={Link} to={`/patients/${p.id}`}
                >
                    <ListItemText primary={p.name} />
                </ListItem>
            )})
    const handleAddNewPatient=()=>{
        // @ts-ignore
        dispatch(addPatientThunk({name:newPatientName}))
    }

    return (
    <>
        <TextField onChange={handleChange} value={newPatientName}  label="name" name="name" variant="filled" />
        <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={handleAddNewPatient}
        >
            add New
        </Button>
            <List component="nav" aria-label="main mailbox folders">
                {list}
            </List>
    </>
    );
};

