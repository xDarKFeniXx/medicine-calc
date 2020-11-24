import React, {useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid, TextField} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinkUi from "@material-ui/core/Link";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerNewUserThunk} from "../../store/auth-reducer/auth-reducer";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export const RegisterPage = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [profession, setProfession] = useState('Врач')
    const classes=useStyles()
    const dispatch=useDispatch()
    const history=useHistory()
    const handleRegistration=(e:any)=>{
        e.preventDefault()
        dispatch(registerNewUserThunk(name, profession, email, password))
        history.push('/profile')
    }
    return (
        <Container  maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                autoFocus
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="Profession"
                                label="Profession"
                                name="profession"
                                autoComplete="profession"
                                value={profession}
                                onChange={(e)=>setProfession(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!name||!email||!password||!profession}
                        onClick={handleRegistration}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <LinkUi variant="body2" color="primary" component={Link} to="/login">
                                Already have an account? Sign in
                            </LinkUi>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

