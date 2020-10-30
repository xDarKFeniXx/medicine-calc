import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {categoriesSelector} from "../../store/categories-reducer/categories-selectors";
import {Dialog, List, ListSubheader, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {
    addNewCategoryThunk,
    deleteCategoryThunk,
    updateCategoryThunk
} from "../../store/categories-reducer/categories-reducer";
import {DialogEditField} from "../../components/dialog/dialog";
import {
    addNewBillPositionThunk,
    deleteBillPositionThunk,
    updateBillPositionThunk
} from "../../store/bill-positions/bill-positions-reducer";
import {ListBillPositions} from "../../components/list-positions/list-bill-positions";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import {billPositionsSelector} from "../../store/bill-positions/bill-positions-selectors";

const useStyles = makeStyles((theme: Theme) => ({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        categoryText: {
            // [theme.breakpoints.down('xs')]: {
            //     fontSize: "10px",
            // },
        },
        positionText: {
            [theme.breakpoints.down('xs')]: {
                fontSize: "10px",
            },
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
        iconSize: {
            [theme.breakpoints.down('xs')]: {
                fontSize: "12px",
            },
        },
        rootIconList: {
            [theme.breakpoints.down('xs')]: {
                minWidth: "20px",
            },
        },
        buttonBlock: {
            display: 'inline-flex',
            justifyContent: 'space-around',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    })
);

export const BillPositionsPage = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const categories = useSelector(categoriesSelector)
    const billPositions = useSelector(billPositionsSelector)
    const [openArray, setOpenArray] = useState(new Array(categories.length).fill(false))

    const handleClick = (index: number) => {
        const newItem = !openArray[index]
        setOpenArray([...openArray.slice(0, index), newItem, ...openArray.slice(index + 1)])
    }
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleDeleteBillPosition = (id: string) => {
        dispatch(deleteBillPositionThunk(id))
    }
    const handleDeleteCategory = (id: string) => {
        billPositions.filter(pos => pos.categoryId === id).forEach(item => {
            dispatch(deleteBillPositionThunk(item.id))
        })
        dispatch(deleteCategoryThunk(id))
    }
    const [dialogProps, setDialogProps] = useState({
        title: "",
        categories,
        handleClose: handleClose,
        name: "",
        price: 0,
        value: "",
        categoryId: "",
        id: "",
        callbackDispatch: () => null
    })
    const handleChangeCategory = (categoryId: string, categoryName: string) => {

        setDialogProps({
            ...dialogProps,
            title: "edit category",
            name: "category",
            categories: categories,
            id: categoryId,
            value: categoryName,
            // @ts-ignore
            callbackDispatch: updateCategoryThunk
        })
        setOpen(true)
    }
    const handleChangeBillPosition = (id: string, name: string, categoryId: string, price: number) => {
        setDialogProps({
            ...dialogProps,
            title: " edit bill position",
            name: "bill position",
            categories: categories,
            id: id,
            categoryId: categoryId,
            price: price,
            value: name,
            // @ts-ignore
            callbackDispatch: updateBillPositionThunk
        })
        setOpen(true)
    }


    const handleAddCategory = () => {
        setDialogProps({
            ...dialogProps,
            title: "add category",
            name: "category",
            categories: categories,
            id: "",
            value: "",
            // @ts-ignore
            callbackDispatch: addNewCategoryThunk
        })
        setOpen(true)
    }
    const handleAddBillPosition = () => {
        setDialogProps({
            ...dialogProps,
            title: "add bill position",
            name: "bill position",
            categories: categories,
            id: "",
            value: "",
            // @ts-ignore
            callbackDispatch: addNewBillPositionThunk
        })
        setOpen(true)
    }

    return (
        <>
            <div className={classes.buttonBlock}>
                <Button
                    variant="contained"
                    component={"span"}
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={handleAddCategory}>add category</Button>
                <Button
                    variant="contained"
                    component={"span"}
                    color="secondary"
                    endIcon={<Icon>send</Icon>}
                    onClick={handleAddBillPosition}>add billPosition</Button>
            </div>


                <ListBillPositions
                    classes={classes}
                    handleChangeBillPosition={handleChangeBillPosition}
                    handleClick={handleClick}
                    handleChangeCategory={handleChangeCategory}
                    openArray={openArray}
                    handleDeleteCategory={handleDeleteCategory}
                    handleDeleteBillPosition={handleDeleteBillPosition}

                />

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogEditField {...dialogProps}/>
            </Dialog>
        </>
    );
};

