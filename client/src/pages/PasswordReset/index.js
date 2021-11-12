import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Form, Button, Image, Icon } from 'semantic-ui-react';
import Service from '../../api/service';
import { notification } from 'antd';
import logo4 from '../../assets/logo4.png';
import Cookies from 'js-cookie';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import './style.css';

function PasswordReset() {
    const { resetToken } = useParams();
    const [passwordValues, setPasswordValues] = useState({
        password: '',
        passwordConfirm: '',
    });
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const handleInputChange = (val) => (event) => {
        setPasswordValues({ ...passwordValues, [val]: event.target.value });
    };

    const resetPasswordHandler = async () => {
        await Service.resetPassword({ passwordValues, resetToken })
            .then(() => {
                notification.open({
                    message: `Password reset successful`,
                    icon: <Image src={logo4} wrapped style={{ width: 30 }} />,
                });
                Cookies.remove('jwt');
                history.push('/');
            })
            .catch((err) => {
                setErrorMessage(err.response?.data.message);
                setIsAlertVisible(true);
            });
    };

    const closeAlertHandler = () => {
        setIsAlertVisible(false);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className='passwordResetPage'>
                <Grid.Column>
                    {isAlertVisible && (
                        <Alert
                            severity='warning'
                            action={
                                <Icon
                                    name='close'
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
                    <Form>
                        <Form.Field>
                            <label>New Password</label>
                            <input
                                id='password'
                                type='password'
                                placeholder='New Password'
                                onChange={handleInputChange('password')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm New Password</label>
                            <input
                                id='confirmPassword'
                                type='password'
                                placeholder='Confirm New Password'
                                onChange={handleInputChange('passwordConfirm')}
                            />
                        </Form.Field>
                        <Button secondary onClick={resetPasswordHandler}>
                            Confirm
                        </Button>
                    </Form>
                </Grid.Column>
            </div>
        </div>
    );
}

export default PasswordReset;
