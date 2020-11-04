import React from 'react';
import {CreatePagePdf} from "./create-page-pdf";
import {Text} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const TablePdf=styled.View`
box-sizing:border-box;
display:flex;
flex-direction:column;
width:180mm;
`
const TableRow=styled.View`
display:flex;
flex-direction:row;
width:180mm;
`
const TableCell=styled.View`
min-height: 10mm;
border: 0.35mm solid black;
`
const Cell1=styled(TableCell)`
    width: 10mm;
`
const Cell2=styled(TableCell)`
  width:110mm;
`
const Cell3=styled(TableCell)`
    width: 30mm;
`
const Cell4=styled(TableCell)`
    width:30mm;
`
export const CreateBillPdf = ({bill}) => {
    console.log(bill)
    debugger
    let counterRows=0
    const positions=bill.positions.map(pos=>{
        if(+pos.count!==0){
            counterRows++
            return(
                <TableRow key={pos.id} wrap={false}>
                    <Cell1>
                       <Text> {counterRows}</Text>
                    </Cell1>
                    <Cell2><Text>{pos.name}</Text></Cell2>
                    <Cell3><Text>{pos.count}</Text></Cell3>
                    <Cell4><Text>{+pos.count*+pos.price}</Text></Cell4>
                </TableRow>
            )
        } else {
            return null
        }
    })


    return (
        <CreatePagePdf bill={bill}>
            <Text>Услуги</Text>
            <TablePdf wrap>
                <TableRow>
                    <Cell1><Text>№пп</Text></Cell1>
                        <Cell2><Text>Наименование услуги</Text></Cell2>
                        <Cell3><Text>Количество</Text></Cell3>
                        <Cell4><Text>Сумма, руб.</Text></Cell4>

                </TableRow>
                {positions}
            </TablePdf>
        </CreatePagePdf>
    );
};

