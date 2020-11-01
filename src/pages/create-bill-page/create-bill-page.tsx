import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currentUserSelector} from "../../store/auth-reducer/auth-selectors";
import {
    addStarDataAction,
    changeCountAction,
    changeDiscountAction,
    changeElementAction,
    resetBillAction
} from "../../store/new-bill/new-bill-reducer";
import {newBillStateSelector} from "../../store/new-bill/new-bill-selectors";
import {categoriesSelector} from "../../store/categories-reducer/categories-selectors";
import {billPositionsSelector} from "../../store/bill-positions/bill-positions-selectors";
import {patientsSelector} from "../../store/patients-reducer/patients-selector";
import {Divider, List, TextField} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton'
import Button from "@material-ui/core/Button";
import {addNewBillThunk} from "../../store/bills-reducer/bills-reducer";
import {useHistory} from 'react-router-dom'

export const CreateBillPage = () => {
    const date=new Date().toLocaleDateString()
    const history=useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(currentUserSelector)
    const categories = useSelector(categoriesSelector)
    const billPositions = useSelector(billPositionsSelector)
    useEffect(() => {
        //@ts-ignore
        dispatch(addStarDataAction(currentUser.id, currentUser.name, categories, billPositions, date))
    }, [])
    const newBillState = useSelector(newBillStateSelector)

    const patients = useSelector(patientsSelector)
    const patientsList = patients.map(patient => <MenuItem key={patient.id}
                                                           value={patient.id}>{patient.name}</MenuItem>)
    const onChangePatient = (e: any) => {
                // @ts-ignore
        const name=patients.find(p=>p.id===e.target.value).name
        dispatch(changeElementAction('patientId', e.target.value))
        dispatch(changeElementAction('patientName', name))
    }
    const handleIncrease=(id:string)=>dispatch(changeCountAction(id, true))
    const handleDecrease=(id:string)=>dispatch(changeCountAction(id, false))
    const handleChangeDiscount=(e:any)=>{
        if(e.target.value>=0&&e.target.value<=100){
            dispatch(changeDiscountAction(e.target.value))
        }
    }
    const handleSaveBill=()=>{
        dispatch(addNewBillThunk(newBillState))
        history.push('/bills')
    }
    const handleResetForm=()=>{
        dispatch(resetBillAction())
        //@ts-ignore
        dispatch(addStarDataAction(currentUser.id, currentUser.name, categories, billPositions, date))
    }
    //@ts-ignore
    const categoriesList = newBillState.categories.map(category => {
        //@ts-ignore
        const currentBillPositions = newBillState.positions.filter(pos => pos.categoryId === category.id)
        //@ts-ignore
        const listPositions = currentBillPositions.map(pos => {
            return (
                <ListItem key={pos.id}>
                    <ListItemText primary={pos.name}
                                  // classes={{ primary:classes.positionText }}

                    />
                    <IconButton onClick={()=>handleDecrease(pos.id)}>
                        <RemoveIcon/>
                    </IconButton>
                    <ListItemText primary={pos.count}
                        // classes={{ primary:classes.positionText }}

                    />
                    <IconButton onClick={()=>handleIncrease(pos.id)}>
                        <AddIcon/>
                    </IconButton>
                    <ListItemText primary={+pos.count*+pos.price}
                        // classes={{ primary:classes.positionText }}

                    />
                </ListItem>
            )
        })
        return (
            <div key={category.id}>
            <ListItem >
                <ListItemText primary={category.name}/>

            </ListItem>
                <List>
                    {listPositions}
                </List>
            </div>
        )
    })


    return (
        <div>
            {/*@ts-ignore*/}
            <div>{newBillState.createDate}</div>
            <Divider/>
            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
            <Select
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // @ts-ignore
                value={newBillState.patientId}
                onChange={onChangePatient}
            >
                {patientsList}
            </Select>
            {/*<TextField*/}
            {/*    id="date"*/}
            {/*    label="date"*/}
            {/*    type="date"*/}
            {/*    />*/}
            <Divider/>
            <List>

            {categoriesList}
            </List>
            <Divider/>
            <TextField
                id="discount"
                label="discount"
                type="number"
//                @ts-ignore
                value={newBillState.discount}
                onChange={handleChangeDiscount}
                />
            {/*@ts-ignore*/}
            {newBillState.sum.toFixed(2)}
            {/*@ts-ignore*/}

            <Button disabled={newBillState.patientName===""}
                onClick={handleSaveBill}
            >
                save
            </Button>
            {/*@ts-ignore*/}
            <Button
                    onClick={handleResetForm}
            >
                reset
            </Button>
        </div>
    );
};

