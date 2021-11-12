import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Grid,
    Form,
    Accordion,
    Button,
    Radio,
    Icon,
    Dropdown,
    Dimmer,
} from 'semantic-ui-react';
import Loader from '../../components/Loader/index';
import { Alert, AlertTitle } from '@material-ui/lab';
import { authActions } from '../../store/auth';
import { useMediaQuery } from 'react-responsive';
import { notification } from 'antd';
import './style.css';
import countryList from 'react-select-country-list';
import Service from '../../api/service';
import Cookies from 'js-cookie';

function UserProfile() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [userValues, setUserValues] = useState({
        // email: '',
        // username: '',
        // fullName: '',
        country: '',
        city: '',
        address: '',
        photo: '',
    });
    const [userPhoto, setUserPhoto] = useState(null);

    const [passwordValues, setPasswordValues] = useState({
        passwordCurrent: '',
        password: '',
        passwordConfirm: '',
    });

    const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [countryOptions, setCountryOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const isTabletOrMobile = useMediaQuery({
        query: '(max-device-width: 1024px)',
    });

    useEffect(() => {
        setUserValues({
            email: currentUser.email,
            username: currentUser.username,
            fullName: currentUser.fullName,
            country: currentUser.country,
            city: currentUser.city,
            address: currentUser.address,
            photo: currentUser.photo,
        });

        const fetchCountryOptions = () => {
            let countryForDelete = [
                'AQ',
                'BQ',
                'CW',
                'GG',
                'IM',
                'JE',
                'BL',
                'MF',
                'SX',
                'SS',
            ];
            const modifiedCountryOptions = countryList()
                .getData()
                .filter((country) => !countryForDelete.includes(country.value))
                .map((country) => {
                    return {
                        key: country.value.toLowerCase(),
                        value: country.value.toLowerCase(),
                        flag: country.value.toLowerCase(),
                        text: country.label,
                    };
                });
            setCountryOptions(modifiedCountryOptions);
        };

        fetchCountryOptions();
    }, [
        currentUser.address,
        currentUser.city,
        currentUser.country,
        currentUser.email,
        currentUser.fullName,
        currentUser.photo,
        currentUser.username,
    ]);

    const onClickOpenAccordion = (e, title) => {
        const { index } = title;
        if (index === 0) {
            setActiveIndex(-1);
            return true;
        } else {
            setActiveIndex(0);
            return false;
        }
    };

    const onChangePasswordHandler = (e) => {
        const { id, value } = e.target;
        setPasswordValues({ ...passwordValues, [id]: value });
    };

    const handleDisableEdit = (e, value) => {
        if (value.checked === true) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    };

    const confirmUpdatePasswordHandler = async () => {
        if (
            passwordValues.password !== passwordValues.passwordConfirm ||
            passwordValues.password.length < 8
        ) {
            setIsErrorMessageVisible(true);
        } else {
            await Service.updatePassword({
                passwordValues,
                userId: currentUser._id,
            })
                .then((res) => {
                    Cookies.set('jwt', `${res.data.token}`, { expires: 1 });
                    notification.open({
                        message: `Password changed successfully`,
                        icon: <Icon name="check circle outline" />,
                    });
                    setPasswordValues({
                        passwordCurrent: '',
                        password: '',
                        passwordConfirm: '',
                    });
                    setActiveIndex(0);
                    setIsErrorMessageVisible(false);
                })
                .catch((err) => {
                    // console.log(err.response);
                    setErrorMessage(err.response?.data.message);
                    setIsErrorMessageVisible(true);
                });
        }
    };

    const handleInputChange = (val) => (event) => {
        if (val === 'photo') {
            setUserPhoto(event.target.files[0]);
        }
        if (val === 'country') {
            setUserValues({ ...userValues, [val]: event.target.textContent });
        } else {
            setUserValues({ ...userValues, [val]: event.target.value });
        }
    };

    const updateProfileHandler = async () => {
        setIsLoading(true);
        if (userPhoto) {
            const formData = new FormData();
            formData.append('photo', userPhoto);
            formData.append('userId', currentUser._id);
            await Service.uploadUserPhoto(formData)
                .then(() => {
                    console.log('Uploaded successfully');
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        await Service.updateCurrentUser({
            ...userValues,
            userId: currentUser._id,
        })
            .then((res) => {
                setUserValues({
                    // email: res.data.user.email,
                    // username: res.data.user.username,
                    // fullName: res.data.user.fullName,
                    country: res.data.user.country,
                    city: res.data.user.city,
                    address: res.data.user.address,
                    photo: res.data.user.photo,
                });
                dispatch(authActions.setUser(res.data.user));
                notification.open({
                    message: `Profile updated successfully`,
                    icon: <Icon name="check circle outline" />,
                });
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const isConfirmButtonDisabled =
        !passwordValues.passwordCurrent ||
        !passwordValues.password ||
        !passwordValues.passwordConfirm;

    const closeAlertHandler = () => {
        setIsErrorMessageVisible(false);
    };

    return (
        <div style={{ display: 'flex' }}>
            {isLoading && (
                <Dimmer active inverted>
                    <Loader style={{ marginTop: 100, position: 'fixed' }} />
                </Dimmer>
            )}
            <div className="userProfile">
                <div style={{ float: 'right' }}>
                    <Radio
                        toggle
                        label="Edit Profile"
                        onChange={handleDisableEdit}
                    />
                </div>
                <Grid.Column>
                    <Form>
                        <Form.Field>
                            <label>Username</label>
                            <input
                                id="username"
                                placeholder="Username"
                                defaultValue={currentUser.username}
                                disabled
                                // onChange={handleInputChange('username')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                id="email"
                                placeholder="Email"
                                defaultValue={currentUser.email}
                                disabled
                                // onChange={handleInputChange('email')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Full Name</label>
                            <input
                                id="fullName"
                                placeholder="Full Name"
                                defaultValue={currentUser.fullName}
                                disabled
                                // onChange={handleInputChange('fullName')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Profile Photo</label>
                            <img
                                src={
                                    !currentUser.photo
                                        ? publicFolder + `users/noAvatar.jpg`
                                        : publicFolder +
                                          `users/${currentUser.photo}`
                                }
                                alt="Profile"
                                className="profilePhoto"
                                style={{ marginBottom: 5 }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="photo"
                                name="photo"
                                disabled={isDisabled}
                                onChange={handleInputChange('photo')}
                            />
                            {/* <but */}
                        </Form.Field>
                        <Form.Field>
                            <Dropdown
                                placeholder={
                                    currentUser.country
                                        ? currentUser.country
                                        : 'Select Country'
                                }
                                fluid
                                search
                                selection
                                disabled={isDisabled}
                                options={countryOptions}
                                id="country"
                                onChange={handleInputChange('country')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>City</label>
                            <input
                                id="city"
                                placeholder="City"
                                defaultValue={userValues.city}
                                disabled={isDisabled}
                                onChange={handleInputChange('city')}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Address</label>
                            <input
                                id="address"
                                placeholder="Address"
                                defaultValue={userValues.address}
                                disabled={isDisabled}
                                onChange={handleInputChange('address')}
                            />
                        </Form.Field>
                        <Button
                            secondary
                            onClick={updateProfileHandler}
                            style={{ marginTop: 20 }}
                            disabled={isDisabled}
                        >
                            Update profile
                        </Button>
                    </Form>
                    <Accordion
                        styled
                        style={{
                            marginTop: 20,
                            width: isTabletOrMobile && '100%',
                        }}
                    >
                        <Accordion.Title
                            content="Password Change"
                            onClick={onClickOpenAccordion}
                            index={activeIndex}
                        />
                        <Accordion.Content active={activeIndex}>
                            <Form error>
                                {isErrorMessageVisible && (
                                    <Alert
                                        severity={
                                            errorMessage ? 'error' : 'warning'
                                        }
                                        action={
                                            <Icon
                                                name="close"
                                                onClick={closeAlertHandler}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        }
                                    >
                                        <AlertTitle>Warning</AlertTitle>
                                        {errorMessage
                                            ? errorMessage
                                            : 'Passwords do not match or at least 8 character password is mandatory'}{' '}
                                        — <strong> Try again !</strong>
                                    </Alert>
                                )}
                                <Form.Field>
                                    <label>Current password</label>
                                    <input
                                        id="passwordCurrent"
                                        placeholder="Current password"
                                        onChange={onChangePasswordHandler}
                                        value={passwordValues.passwordCurrent}
                                        type="password"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>New password</label>
                                    <input
                                        id="password"
                                        placeholder="New password"
                                        onChange={onChangePasswordHandler}
                                        value={passwordValues.password}
                                        type="password"
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Repeat new password</label>
                                    <input
                                        placeholder="Repeat new password"
                                        id="passwordConfirm"
                                        onChange={onChangePasswordHandler}
                                        value={passwordValues.passwordConfirm}
                                        type="password"
                                    />
                                </Form.Field>
                                <Button
                                    secondary
                                    onClick={confirmUpdatePasswordHandler}
                                    disabled={isConfirmButtonDisabled}
                                >
                                    Change Password
                                </Button>
                            </Form>
                        </Accordion.Content>
                    </Accordion>
                </Grid.Column>
            </div>
        </div>
    );
}

export default UserProfile;
