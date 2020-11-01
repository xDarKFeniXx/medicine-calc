import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {billPositionsSelector} from "../../store/bill-positions/bill-positions-selectors";
import {categoriesSelector} from "../../store/categories-reducer/categories-selectors";
import {Collapse, TableBody} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";


export const ListBillPositions = (props: any) => {
    const {
        handleChangeBillPosition,
        handleChangeCategory,
        handleDeleteBillPosition,
        handleDeleteCategory
    } = props
    const billPositions = useSelector(billPositionsSelector)
    const categories = useSelector(categoriesSelector)
    const [openArray, setOpenArray] = useState(new Array(categories.length).fill(false))

    const handleClick = (index: number) => {
        const newItem = !openArray[index]
        setOpenArray([...openArray.slice(0, index), newItem, ...openArray.slice(index + 1)])
    }

    const tableCategories = categories.map((category, index) => {
        const currentBillPositions = billPositions.filter(pos => pos.categoryId === category.id)
        const tablePositionsByCategory = currentBillPositions.map(pos => {
            return (
                <TableRow key={pos.id}>
                    <TableCell colSpan={7}>
                        {pos.name}
                    </TableCell>
                    <TableCell colSpan={3}>{pos.price}</TableCell>
                    <TableCell colSpan={2}>
                        <IconButton
                                    onClick={() => handleDeleteBillPosition(pos.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                                    onClick={() => handleChangeBillPosition(pos.id, pos.name, category.id, pos.price)}
                        >
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
            )
        })
        return (
            <React.Fragment key={category.id}>
                <TableRow>
                    <TableCell colSpan={2}>
                        <IconButton onClick={() => handleClick(index)}>
                            {openArray[index] ? <ExpandLess/> :
                                <ExpandMore />}
                        </IconButton>
                    </TableCell>
                    <TableCell colSpan={7}>
                        {category.name}
                    </TableCell>
                    <TableCell colSpan={3}>
                        <IconButton
                                    onClick={() => handleDeleteCategory(category.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                                    onClick={() => handleChangeCategory(category.id, category.name)}
                        >
                            <EditIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>

                    <TableCell colSpan={12} style={{padding: "2px"}}>
                        <Collapse in={openArray[index]} timeout="auto" unmountOnExit

                        >
                            <Paper>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={7}>Name</TableCell>
                                            <TableCell colSpan={3}>price</TableCell>
                                            <TableCell colSpan={2}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                {tablePositionsByCategory}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        )
    })

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={2}/>
                        <TableCell colSpan={7}>Name</TableCell>
                        <TableCell colSpan={3}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {tableCategories}

                </TableBody>
            </Table>
        </TableContainer>
    )
};

