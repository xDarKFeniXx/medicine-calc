import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {categoriesSelector} from "../../store/categories-reducer/categories-selectors";
import {Dialog, List, ListSubheader, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {updateCategoryThunk} from "../../store/categories-reducer/categories-reducer";
import {DialogEditField} from "../../components/dialog/dialog";
import {updateBillPositionThunk} from "../../store/bill-positions/bill-positions-reducer";
import {ListBillPositions} from "../../components/list-positions/list-bill-positions";

const useStyles = makeStyles((theme: Theme) =>({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        categoryText:{
            [theme.breakpoints.down('xs')]: {
                fontSize: "10px",
            },
        },
        positionText:{
            [theme.breakpoints.down('xs')]: {
                fontSize: "10px",
            },
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        iconSize:{
            [theme.breakpoints.down('xs')]: {
                fontSize: "12px",
            },
        },
        rootIconList:{
            [theme.breakpoints.down('xs')]: {
                minWidth: "20px",
            },
        }
    })
);

export const BillPositionsPage = () => {
    const classes=useStyles()
    const categories=useSelector(categoriesSelector)
    const [openArray, setOpenArray] = useState(new Array(categories.length).fill(false))

    const handleClick=(index:number)=>{
        const newItem=!openArray[index]
        setOpenArray([...openArray.slice(0, index), newItem, ...openArray.slice(index+1)])
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [dialogProps, setDialogProps]=useState({
        title: "",
        categories:categories,
        handleClose: handleClose ,
        name:"",
        value:"",
        categoryId: "",
        id:"",
        callbackDispatch:()=>null
    })
    const handleChangeCategory=(categoryId:string, categoryName:string)=>{

        setDialogProps({
            ...dialogProps,
            title: " edit category",
            name: "category",
            id: categoryId,
            value: categoryName,
            // @ts-ignore
            callbackDispatch: updateCategoryThunk
        })
        setOpen(true)
    }
    const handleChangeBillPosition=(id:string, name:string, categoryId:string)=>{
        setDialogProps({
            ...dialogProps,
            title: " edit bill position",
            name: "bill position",
            id: id,
            categoryId:categoryId,
            value: name,
            // @ts-ignore
            callbackDispatch: updateBillPositionThunk
        })
        setOpen(true)
    }


    return (
        <>
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Categories
                </ListSubheader>
            }
            className={classes.root}
        >

            <ListBillPositions
                classes={classes}
                handleChangeBillPosition={handleChangeBillPosition}
                handleClick={handleClick}
                handleChangeCategory={handleChangeCategory}
                openArray={openArray}
            />
        </List>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogEditField {...dialogProps}/>
    </Dialog>
        </>
    );
};

