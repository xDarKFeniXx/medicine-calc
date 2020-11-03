import React from 'react';
import {Text, Page, Font, View} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const Footer=styled.View`
    display:flex;
`
export const FooterPdf = ({discount, summ}) => {
    return (
        <Footer>
            <Text>Footer</Text>
            <Text>{summ} - {discount}</Text>
        </Footer>
    );
};

