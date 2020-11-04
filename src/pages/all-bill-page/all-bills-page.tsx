import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { allBillsSelector } from '../../store/bills-reducer/bills-selectors';
import {Paper} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from '@material-ui/icons/GetApp';
import {makeStyles} from "@material-ui/core/styles";
import {BillI} from "../../store/new-bill/new-bill-reducer";
import {pdf, Document} from "@react-pdf/renderer";
import {saveAs} from 'file-saver'
import {CreateBillPdf} from "../../pdf/create-bill-pdf";
import {deleteBillThunk} from "../../store/bills-reducer/bills-reducer";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles=makeStyles((theme)=>({
    [theme.breakpoints.down('xs')]:{
        tableCellPadding:{
            padding:2,
            fontSize:6
        }
    }
}))

export const AllBillsPage = () => {
    const classes=useStyles()
    const dispatch=useDispatch()
    const allBills=useSelector(allBillsSelector)
    const handleDownload=async (bill:BillI)=>{
        const namePdf=`${bill.patientName}_${bill.createDate}_${bill.id?.substring(2)}`

        const blob=await pdf((
            <Document title={namePdf}>
                <CreateBillPdf bill={bill}/>
            </Document>
        )).toBlob();
        saveAs(blob, namePdf + '.pdf');
    }
    const handleDeleteBill=async (id:string)=>{
        await dispatch(deleteBillThunk(id))
    }
    const allBillsList=allBills.map(bill=>{

        return(
            <TableRow key={bill.id}>
                <TableCell className={classes.tableCellPadding}>{bill.patientName}</TableCell>
                <TableCell className={classes.tableCellPadding}>{bill.createDate}</TableCell>
                <TableCell className={classes.tableCellPadding}>{bill.sum} &#8381;</TableCell>
                <TableCell className={classes.tableCellPadding}>
                    <IconButton onClick={()=>handleDownload(bill)}>
                        <GetAppIcon/>
                    </IconButton>
                    {/*@ts-ignore*/}
                    <IconButton onClick={()=>handleDeleteBill(bill.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
        )
    })
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCellPadding}>Пациент</TableCell>
                            <TableCell className={classes.tableCellPadding}>Дата</TableCell>
                            <TableCell className={classes.tableCellPadding}>Сумма</TableCell>
                            <TableCell className={classes.tableCellPadding}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allBillsList}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

