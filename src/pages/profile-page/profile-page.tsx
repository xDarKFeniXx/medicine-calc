import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../../store/auth-reducer/auth-selectors";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {updateUserInfoThunk} from "../../store/auth-reducer/auth-reducer";

export const ProfilePage = () => {
    const currentUser=useSelector(currentUserSelector)
    const dispatch=useDispatch()
    const [user, setUser] = useState({name: "", position:""})
    useEffect(()=>{
        if(user.name===""){
            //@ts-ignore
            setUser({name:currentUser.name, position:currentUser.medicPosition})

        }
    }, [currentUser, user])
    const handleChange=(e:any)=>{
        setUser({...user, [e.target.name]:e.target.value})
    }
    const handleSaveUser=()=>{
        dispatch(updateUserInfoThunk(user.name, user.position))
    }
    return (
        <div>
            <TextField onChange={handleChange} value={user.name}  label="name" name="name" variant="filled" />
            <TextField onChange={handleChange} value={user.position}  label="position" name="position" variant="filled" />
            <Button
                variant="contained"
                color="primary"
                endIcon={<Icon>send</Icon>}
                onClick={handleSaveUser}
            >
                Send
            </Button>
        </div>
    );
};

