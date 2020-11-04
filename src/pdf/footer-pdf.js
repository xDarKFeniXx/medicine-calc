import React from 'react';
import {Text, Page, Font, View} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const Footer=styled.View`
    display:flex;
    height: 20mm;
`
export const FooterPdf = () => {
    return (
        <Footer >
            <Text>Клиника-лечите зубы у нас)</Text>
        </Footer>
    );
};

