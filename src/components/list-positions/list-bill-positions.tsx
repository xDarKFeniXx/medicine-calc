import React from 'react';
import {useSelector} from "react-redux";
import {billPositionsSelector} from "../../store/bill-positions/bill-positions-selectors";
import {categoriesSelector} from "../../store/categories-reducer/categories-selectors";
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import CategoryIcon from "@material-ui/icons/Category";
import EditIcon from "@material-ui/icons/Edit";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

export const ListBillPositions = (props:any) => {
    const {classes,
        handleChangeBillPosition,
        handleClick,
        handleChangeCategory,
        openArray,
        handleDeleteBillPosition,
        handleDeleteCategory}=props
    const billPositions=useSelector(billPositionsSelector)
    const categories=useSelector(categoriesSelector)
    const listCategories=categories.map((category, index)=>{
        const currentBillPositions=billPositions.filter(pos=>pos.categoryId===category.id)
        const listPositionsFromCategory=currentBillPositions.map(pos=>{
            return(

                <ListItem button
                          key={pos.id}
                          className={classes.nested}

                >
                    <ListItemIcon className={classes.rootIconList}>
                        <ClassIcon className={classes.iconSize}/>
                    </ListItemIcon>
                    <ListItemText primary={pos.name}
                                  classes={{ primary:classes.positionText }}
                    />
                    <ListItemText primary={pos.price}
                                  classes={{ primary:classes.positionText }}
                    />
                    <IconButton className={classes.rootIconList}
                        onClick={()=>handleDeleteBillPosition(pos.id)}
                    >
                        <DeleteIcon className={classes.iconSize}/>
                    </IconButton>
                    <IconButton className={classes.rootIconList}
                                onClick={()=>handleChangeBillPosition(pos.id, pos.name, category.id, pos.price)}
                    >
                        <EditIcon className={classes.iconSize}/>
                    </IconButton>
                </ListItem>

            )
        })
        return(
            <div key={category.id}>
                <ListItem button >
                    <ListItemIcon className={classes.rootIconList}>
                        <CategoryIcon className={classes.iconSize}/>
                    </ListItemIcon>
                    <ListItemText primary={category.name} classes={{ primary:classes.categoryText }}/>
                    <IconButton className={classes.rootIconList}
                                  onClick={()=>handleDeleteCategory(category.id)}
                    >
                        <DeleteIcon className={classes.iconSize}/>
                    </IconButton>
                    <IconButton className={classes.rootIconList}
                                  onClick={()=>handleChangeCategory(category.id, category.name)}
                    >
                        <EditIcon className={classes.iconSize}/>
                    </IconButton>
                    <IconButton onClick={()=>handleClick(index)}>
                    {openArray[index] ? <ExpandLess className={classes.iconSize}/> : <ExpandMore className={classes.iconSize}/>}
                    </IconButton>
                </ListItem>
                <Collapse in={openArray[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {listPositionsFromCategory}
                    </List>
                </Collapse>
            </div>
        )
    })


    return (
        <div>
            {listCategories}
        </div>
    );
};

