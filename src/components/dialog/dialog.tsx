import DialogTitle from '@material-ui/core/DialogTitle';
import React, {useState} from 'react';
import {DialogContent} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export const DialogEditField = (props:any) => {
    const {handleClose, title, name, value, id, callbackDispatch, categories, categoryId, price}=props
    const itemsForCategories=name!=="bill position"
        ?null
        //@ts-ignore
        :categories.map(category=>{
        return(
            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
        )
    })
    const dispatch=useDispatch()
    const [valueField, setValueField] = useState(value)
    const [categoryField, setCategoryField] = useState(categoryId)
    const [priceField, setPriceField] = useState(price)
    const handleEdit=()=>{
        if(name==="bill position"){
        dispatch(callbackDispatch({id:id, name:valueField, categoryId:categoryField, price:priceField, count: 0}))
        } else{
            dispatch(callbackDispatch({id:id, name:valueField}))
        }
        handleClose()
    }
    const handleOnChange=(e:any)=>{
        setValueField(e.target.value)
    }
    const onChangeCategory=(e:any)=>{
        setCategoryField(e.target.value)
    }
    const handlePriceChange=(e:any)=>{
        setPriceField(e.target.value)
    }
    return (
        <div>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit
                </DialogContentText>
                {name==="bill position"&&<><InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        autoWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={categoryField}
                    onChange={onChangeCategory}
                    >
                        {itemsForCategories}
                    </Select></>}
                <TextField
                    autoFocus
                    margin="dense"
                    id={name}
                    fullWidth
                    value={valueField}
                    onChange={handleOnChange}
                />
                {name==="bill position"&&<TextField
                    type="number"
                    autoFocus
                    margin="dense"
                    fullWidth
                    value={priceField}
                    onChange={handlePriceChange}
                />}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleEdit}
                    color="primary"
                // TODO сделать валидацию и блокировку кнопки
                >
                    edit
                </Button>
            </DialogActions>
        </div>
    );
};

