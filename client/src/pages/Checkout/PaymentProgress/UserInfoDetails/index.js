import React, { useEffect, useState } from 'react';
import { Form, Button, Dropdown } from 'semantic-ui-react';
import countryList from 'react-select-country-list';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../../store/cart';

function UserInfoDetails(props) {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [countryOptions, setCountryOptions] = useState([]);
    const userValues = useSelector(
        (state) => state.cart.userInfoPaymentDetails
    );
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userValues) {
            setValues({
                fullName: currentUser && currentUser.fullName,
                email: currentUser && currentUser.email,
                address: currentUser.address ? currentUser.address : '',
                city: currentUser.city ? currentUser.city : '',
                country: currentUser.country ? currentUser.country : '',
                postalCode: userValues.postalCode,
            });
        } else {
            setValues(userValues);
        }

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
    }, [userValues, currentUser]);

    const inputChangeHandler = (val) => (event) => {
        if (val === 'country') {
            setValues({
                ...values,
                [val]: event.target.textContent,
            });
        } else {
            setValues({
                ...values,
                [val]: event.target.value,
            });
        }
    };

    const onNextPaymentStepHandler = () => {
        dispatch(cartActions.setActivePaymentOptionNext());
        dispatch(cartActions.setUserInfoPaymentDetails(values));
    };

    const isDisabled =
        !values.fullName ||
        !values.email ||
        !values.address ||
        !values.city ||
        !values.postalCode ||
        !values.country;

    return (
        <div>
            <Form>
                <Form.Input
                    fluid
                    label="Full Name"
                    placeholder="Full Name"
                    id="fullName"
                    value={values.fullName}
                    onChange={inputChangeHandler('fullName')}
                />
                <Form.Input
                    fluid
                    label="Email"
                    placeholder="Email"
                    id="email"
                    value={values.email}
                    onChange={inputChangeHandler('email')}
                />
                <Form.Input
                    fluid
                    label="Address"
                    placeholder="Address"
                    id="address"
                    value={values.address}
                    onChange={inputChangeHandler('address')}
                />
                <Form.Group widths="equal">
                    <Form.Input
                        fluid
                        label="City"
                        placeholder="City"
                        id="city"
                        value={values.city}
                        onChange={inputChangeHandler('city')}
                    />
                    <Form.Input
                        fluid
                        label="Postal code"
                        placeholder="Postal code"
                        id="postalCode"
                        value={values.postalCode}
                        onChange={inputChangeHandler('postalCode')}
                    />
                </Form.Group>
                <Dropdown
                    placeholder={
                        values.country ? values.country : 'Select Country'
                    }
                    fluid
                    search
                    selection
                    options={countryOptions}
                    id="country"
                    onChange={inputChangeHandler('country')}
                />

                {/* <Form.Field style={{ marginTop: 10 }}>
                <Checkbox label='Keep me up to date on news and offers' />
            </Form.Field> */}
                <Button
                    type="submit"
                    onClick={onNextPaymentStepHandler}
                    disabled={isDisabled}
                    content="Next"
                    icon="right arrow"
                    labelPosition="right"
                    secondary
                    style={{ marginTop: 10 }}
                />
            </Form>
        </div>
    );
}

export default UserInfoDetails;
