import React from 'react';
import {CreatePagePdf} from "./create-page-pdf";
import {Text} from "@react-pdf/renderer";

export const CreateBillPdf = ({bill}) => {



    return (
        <CreatePagePdf bill={bill}>
            <Text>dddddddddddd</Text>
        </CreatePagePdf>
    );
};

