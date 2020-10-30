import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";


let theme=createMuiTheme()
theme.overrides={

    MuiTableCell:{
        sizeSmall:{
            [theme.breakpoints.down('xs')]: {
                padding: 0
            }
        }
    },
    MuiButton:{
        root:{
            [theme.breakpoints.down('xs')]: {
                fontSize: 6
            }
        }
    }

}
theme = responsiveFontSizes(theme);
export default theme

