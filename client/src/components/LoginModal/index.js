import React, { useRef, useState } from 'react';
import {
    Grid,
    Avatar,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    Typography,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
// import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import { notification } from 'antd';
import Loader from '../Loader/index';
import { Image, Icon, Dimmer } from 'semantic-ui-react';
import logo from './logo.png';
import Service from '../../api/service';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    loginButton: {
        margin: '20px 0',
        width: '50%',
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: '#ffc107',
        },
    },
    closeButton: {
        color: 'white',
        backgroundColor: 'black',
        '&:hover': {
            backgroundColor: '#ffc107',
        },
    },
}));
function LoginModal(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordResetAlertVisible, setIsPasswordResetAlertVisible] =
        useState(false);
    const [isEmailSentLoading, setIsEmailSentLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    // const history = useHistory();
    const formRef = useRef();

    const handleInputChange = (val) => (event) => {
        setValues({ ...values, [val]: event.target.value });
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await Service.login(values).then((res) => {
                if (res.status === 200) {
                    dispatch(authActions.login());
                    dispatch(authActions.setUser(res.data.user));
                    Cookies.set('jwt', `${res.data.token}`, { expires: 1 });
                    if (
                        res.data.user.role === 'admin' ||
                        res.data.user.role === 'superadmin'
                    ) {
                        dispatch(authActions.setIsUserAdmin());
                    }
                    props.onClose();
                    setIsLoading(false);
                    notification.open({
                        message: `Welcome ${res.data.user.username}`,
                        icon: (
                            <Image src={logo} wrapped style={{ width: 30 }} />
                        ),
                    });
                }
            });
        } catch (err) {
            setIsAlertVisible(true);
            setErrorMessage(err.response?.data.message);
            // console.error(err);
            setIsLoading(false);
        }
    };

    const resetPasswordHandler = async () => {
        if (values.email) {
            setIsEmailSentLoading(true);
            await Service.forgotPassword({ email: values.email })
                .then((res) => {
                    setIsEmailSentLoading(false);
                    props.onClose();
                    notification.open({
                        message: res.data.message,
                        icon: <Icon name="check circle outline" />,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    setIsAlertVisible(true);
                    setErrorMessage(err.response?.data.message);
                    setIsEmailSentLoading(false);
                });
        } else {
            setIsPasswordResetAlertVisible(true);
        }
    };

    const closeAlertHandler = (option) => {
        switch (option) {
            case 'forgotPasswordAlert':
                setIsPasswordResetAlertVisible(false);
                break;
            case 'loginAlert':
                setIsAlertVisible(false);
                break;
            default:
                break;
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <div>
            <Dialog onClose={props.onClose} open={props.visible}>
                {isLoading && (
                    <Dimmer active inverted>
                        <Loader
                            style={{ marginTop: -100, position: 'fixed' }}
                        />
                    </Dimmer>
                )}
                <DialogContent dividers>
                    <Grid align="center">
                        <Avatar style={{ backgroundColor: 'black' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2>Login</h2>
                    </Grid>
                    {isAlertVisible && (
                        <Alert
                            severity="warning"
                            action={
                                <Icon
                                    name="close"
                                    onClick={() =>
                                        closeAlertHandler('loginAlert')
                                    }
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                        >
                            <AlertTitle>Warning</AlertTitle>
                            {errorMessage} — <strong> Try again !</strong>
                        </Alert>
                    )}
                    {isPasswordResetAlertVisible && (
                        <Alert
                            severity="error"
                            action={
                                <Icon
                                    name="close"
                                    onClick={() =>
                                        closeAlertHandler('forgotPasswordAlert')
                                    }
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                        >
                            <AlertTitle>Warning</AlertTitle>
                            Email field cannot be empty —{' '}
                            <strong> Try again !</strong>
                        </Alert>
                    )}
                    <form ref={formRef}>
                        <TextField
                            id="email"
                            label="Email"
                            placeholder="Enter email"
                            type="email"
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            placeholder="Enter password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            style={{ marginTop: 10, marginBottom: 10 }}
                            onChange={handleInputChange('password')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                        >
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                    <Typography
                        onClick={resetPasswordHandler}
                        style={{ cursor: 'pointer', color: 'black' }}
                    >
                        <strong>Forgot password?</strong>{' '}
                    </Typography>
                    {isEmailSentLoading && (
                        <Dimmer active inverted>
                            <Loader size="large">Sending email...</Loader>
                        </Dimmer>
                    )}
                    <Grid align="center">
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.loginButton}
                            fullWidth
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={props.onClose}
                        className={classes.closeButton}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginModal;
