import React from 'react';
import {Text, Page, Font, View} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

const Content=styled.View`
    box-sizing: border-box;
    padding: 5mm 0;
     display:flex;
`;
export const ContentPdf = (props) => {
    return (
        <Content>
            {props.children}
        </Content>
    );
};

