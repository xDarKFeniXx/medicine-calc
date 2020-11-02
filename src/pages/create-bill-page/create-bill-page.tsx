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
import {Card, TableContainer, TextField} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton'
import Button from "@material-ui/core/Button";
import {addNewBillThunk} from "../../store/bills-reducer/bills-reducer";
import {useHistory} from 'react-router-dom'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles=makeStyles((theme)=>({
    [theme.breakpoints.down('xs')]:{
        tableCellPadding:{
            padding:2
        }
    },
    buttonBlock:{
        display:"flex",
        justifyContent: "space-around"
    }
}))

export const CreateBillPage = () => {
    const classes=useStyles()
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
    const handleDateChange=(e:any)=>{
        console.log(e)
    }
    //@ts-ignore
    const tableCategories=newBillState?.categories.map(category=>{
        //@ts-ignore
        const currentBillPositions=newBillState.positions.filter(pos => pos.categoryId === category.id)
        //@ts-ignore
        const tableBillPositions=currentBillPositions.map(pos=>{
            return(
                <TableRow key={pos.id}>
                    <TableCell className={classes.tableCellPadding}>{pos.name}</TableCell>
                    <TableCell className={classes.tableCellPadding}>
                        <IconButton onClick={()=>handleDecrease(pos.id)}>
                            <RemoveIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCellPadding}>{pos.count}</TableCell>
                    <TableCell className={classes.tableCellPadding}>
                        <IconButton onClick={()=>handleIncrease(pos.id)}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCellPadding}>
                        {+pos.count*+pos.price}
                    </TableCell>
                </TableRow>
            )
        })
        return(
            <React.Fragment key={category.id}>
            <TableRow>
                <TableCell colSpan={5}>{category.name}</TableCell>
            </TableRow>
                {tableBillPositions}
            </React.Fragment>

        )
    })

    return (
        <div>
            <Card style={{margin: "5px"}}>
                {/*@ts-ignore*/}
                <div style={{margin: "4px"}}>Date: {newBillState.createDate}</div>

                <TextField
                    size="small"
                    fullWidth
                    select
                    label="patient"
                    id="demo-simple-select"
                    helperText="Please select patient"
                    variant="outlined"
                    // @ts-ignore
                    value={newBillState.patientId}
                    onChange={onChangePatient}
                >
                    {patientsList}
                </TextField>
            </Card>

            <TableContainer component={Paper} >
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            name
                        </TableCell>
                        <TableCell colSpan={3}>
                            price
                        </TableCell>
                        <TableCell>
                            summ
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableCategories}
                    <TableRow>
                        <TableCell colSpan={4}>summ</TableCell>
                        {/*@ts-ignore*/}
                        <TableCell>{newBillState.sum.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            </TableContainer>


                <TextField
                    style={{margin: "10px 5px"}}
                    id="discount"
                    label="discount"
                    size="small"
                    type="number"
                    helperText="Please select discount"
                    variant="outlined"
                    //                @ts-ignore
                    value={newBillState.discount}
                    onChange={handleChangeDiscount}
                />



            <div className={classes.buttonBlock}>
                {/*@ts-ignore*/}
            <Button disabled={newBillState.patientName===""}
                    variant="contained"
                onClick={handleSaveBill}
            >
                save
            </Button>
            {/*@ts-ignore*/}
            <Button
                variant="contained"
                    onClick={handleResetForm}
            >
                reset
            </Button>
            </div>
        </div>
    );
};

