import React from 'react';
import {Text, View} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const Header=styled.View`
     display:flex;
     text-align: left;
     flex-direction: row;
     justify-content: space-between;
     height:30mm;
`

export const HeaderPdf = ({nameDoctor, namePatient, dateBill, summ, discount}) => {
    return (
        <Header >
            <View>
            <Text>Врач: {nameDoctor}</Text>
            <Text>Пациент: {namePatient}</Text>
            <Text>Дата: {dateBill}</Text>
            </View>
            <View>
                <Text>Скидка: {discount}%</Text>
                <Text>Итог: {summ} руб.</Text>
            </View>
        </Header>
    );
};

