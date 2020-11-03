import TableContainer from '@material-ui/core/TableContainer';
import React from 'react';
import {useSelector} from "react-redux";
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

    const allBills=useSelector(allBillsSelector)
    const handleDownload=async (bill:BillI)=>{
        const namePdf=`${bill.patientName}_${bill.createDate}_${bill.id?.substring(2)}`
        console.log(namePdf)
        const blob=await pdf((
            <Document title={namePdf}>
                <CreateBillPdf bill={bill}/>
            </Document>
        )).toBlob();
        saveAs(blob, namePdf + '.pdf');
    }

    const allBillsList=allBills.map(bill=>{
        return(
            // <div key={bill.id}>{bill.sum}</div>
            <TableRow>
                <TableCell className={classes.tableCellPadding}>{bill.patientName}</TableCell>
                <TableCell className={classes.tableCellPadding}>{bill.createDate}</TableCell>
                <TableCell className={classes.tableCellPadding}>{bill.sum}</TableCell>
                <TableCell className={classes.tableCellPadding}>
                    <IconButton onClick={()=>handleDownload(bill)}>
                        <GetAppIcon/>
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
                            <TableCell className={classes.tableCellPadding}>patient</TableCell>
                            <TableCell className={classes.tableCellPadding}>date</TableCell>
                            <TableCell className={classes.tableCellPadding}>summ</TableCell>
                            <TableCell className={classes.tableCellPadding}>actions</TableCell>
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

