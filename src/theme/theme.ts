import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";


let theme=createMuiTheme()
theme.overrides={
    MuiSvgIcon:{
        root:{

            [theme.breakpoints.down('xs')]:{
                fontSize:"14px"
            }
        }
    },
    MuiTableCell:{
        sizeSmall:{
            [theme.breakpoints.down('xs')]:{
                fontSize:"10px",
                // padding: "2px"
            }
        }
    },
    MuiButton:{
        root:{
            [theme.breakpoints.down('xs')]:{
                fontSize:"8px"
            }
        },
        iconSizeMedium:{
            '& > *:first-child':{
                [theme.breakpoints.down('xs')]:{
                    fontSize:"14px"
                }
            }

        }
    }
}
theme = responsiveFontSizes(theme);
export default theme

