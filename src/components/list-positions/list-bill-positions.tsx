import React from 'react';
import {useSelector} from "react-redux";
import {billPositionsSelector} from "../../store/bill-positions/bill-positions-selectors";
import {categoriesSelector} from "../../store/categories-reducer/categories-selectors";
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import CategoryIcon from "@material-ui/icons/Category";
import EditIcon from "@material-ui/icons/Edit";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

export const ListBillPositions = (props:any) => {
    const {classes, handleChangeBillPosition, handleClick, handleChangeCategory, openArray}=props
    const billPositions=useSelector(billPositionsSelector)
    const categories=useSelector(categoriesSelector)
    const listCategories=categories.map((category, index)=>{
        const currentBillPositions=billPositions.filter(pos=>pos.categoryId===category.id)
        const listPositionsFromCategory=currentBillPositions.map(pos=>{
            return(

                <ListItem button
                          key={pos.id}
                          className={classes.nested}
                          onClick={()=>handleChangeBillPosition(pos.id, pos.name, category.id)}
                >
                    <ListItemIcon className={classes.rootIconList}>
                        <ClassIcon className={classes.iconSize}/>
                    </ListItemIcon>
                    <ListItemText primary={pos.name}
                                  classes={{ primary:classes.positionText }}
                    />

                </ListItem>

            )
        })
        return(
            <div key={category.id}>
                <ListItem button onClick={()=>handleClick(index)}>
                    <ListItemIcon className={classes.rootIconList}>
                        <CategoryIcon className={classes.iconSize}/>
                    </ListItemIcon>
                    <ListItemText primary={category.name} classes={{ primary:classes.categoryText }}/>
                    <ListItemIcon className={classes.rootIconList}
                                  onClick={()=>handleChangeCategory(category.id, category.name)}
                    >
                        <EditIcon className={classes.iconSize}/>
                    </ListItemIcon>
                    {openArray[index] ? <ExpandLess className={classes.iconSize}/> : <ExpandMore className={classes.iconSize}/>}
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

