import React, { useRef, useState } from 'react';
import {
    Grid,
    Avatar,
    TextField,
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import { Alert, AlertTitle } from '@material-ui/lab';
import { notification } from 'antd';
import Loader from '../Loader/index';
import { Image, Icon, Dimmer } from 'semantic-ui-react';
import logo from './logo.png';
import Service from '../../api/service';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    singupButton: {
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
function SignupModal(props) {
    const [values, setValues] = useState({
        username: '',
        email: '',
        fullName: '',
        password: '',
        passwordConfirm: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const formRef = useRef();

    const handleInputChange = (val) => (event) => {
        setValues({ ...values, [val]: event.target.value });
    };

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            await Service.signup(values).then((res) => {
                if (res.status === 200) {
                    dispatch(authActions.login());
                    dispatch(authActions.setUser(res.data.user));
                    Cookies.set('jwt', `${res.data.token}`, { expires: 1 });
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
            setErrorMessage(err.response?.data.message);
            setIsAlertVisible(true);
            setIsLoading(false);
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword(!showConfirmPassword);

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
                        <h2>Signup</h2>
                    </Grid>
                    {isAlertVisible && (
                        <Alert
                            severity="warning"
                            action={
                                <Icon
                                    name="close"
                                    onClick={() => setIsAlertVisible(false)}
                                    style={{ cursor: 'pointer' }}
                                />
                            }
                        >
                            <AlertTitle>Warning</AlertTitle>
                            {errorMessage} — <strong> Try again !</strong>
                        </Alert>
                    )}
                    <form ref={formRef}>
                        <TextField
                            id="username"
                            label="Username"
                            placeholder="Enter username"
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('username')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="fullName"
                            label="Full name"
                            placeholder="Enter full name"
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('fullName')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            placeholder="Enter mail"
                            type="email"
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('email')}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
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
                            style={{ marginTop: 10 }}
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
                        <TextField
                            id="passwordConfirm"
                            label="Password Repeat"
                            placeholder="Repeat password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            style={{ marginTop: 10 }}
                            onChange={handleInputChange('passwordConfirm')}
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
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                        >
                                            {showConfirmPassword ? (
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
                    <Grid align="center">
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className={classes.singupButton}
                            fullWidth
                            onClick={handleSignup}
                        >
                            Signup
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

export default SignupModal;
