import React from 'react';
import {Text, Page, Font, View} from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";
import fontStyleTimes from '../assets/fonts/Times New Roman Cyr Regular.TTF';
import boldFontStyleTimes from '../assets/fonts/Times New Roman Cyr Bold.TTF'
import {HeaderPdf} from "./header-pdf";
import {ContentPdf} from "./content-pdf";
import {FooterPdf} from "./footer-pdf";
Font.register(
    // { family: 'Roboto', src: fontStyle },
    // {family: 'Times New Roman', src: fontStyleTimes, fontStyle: 'normal', fontWeight: 'normal'}
    {family: 'Times New Roman', fonts: [
            {src: fontStyleTimes, fontStyle: 'normal', fontWeight: 'normal'},
            {src: boldFontStyleTimes, fontStyle: 'normal', fontWeight: 'bold'}

        ]}
);



export const BodyPage = styled.Page`
  font-family: 'Times New Roman';
  font-size: 12pt;
  padding: 5mm 5mm 5mm 15mm
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

export const CreatePagePdf = (props) => {
    return (
        <BodyPage size="A4" >
            <HeaderPdf fixed
                dateBill={props.bill.createDate}
                       namePatient={props.bill.patientName}
                       nameDoctor={"some one"}
            />
            <ContentPdf>
                {props.children}
            </ContentPdf>
            <FooterPdf
                summ={props.bill.sum}
                discount={props.bill.discount}
                fixed/>
        </BodyPage>
    );
};

