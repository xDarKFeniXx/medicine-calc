import React from 'react';
import {Text} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const Header=styled.View`
     display:flex;
`

export const HeaderPdf = ({nameDoctor, namePatient, dateBill}) => {
    return (
        <Header>
           <Text>Header</Text>
            <Text>{nameDoctor}</Text>
            <Text>{namePatient}</Text>
            <Text>{dateBill}</Text>
        </Header>
    );
};

