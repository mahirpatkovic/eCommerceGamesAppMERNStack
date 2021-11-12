import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Divider, Checkbox, Button } from 'semantic-ui-react'
import { cartActions } from '../../../../store/cart';

function ShippingDetails() {
    const userValues = useSelector(state => state.cart.userInfoPaymentDetails);
    const dispatch = useDispatch();

    const onChangeDetailsHandler = () => {
        dispatch(cartActions.setActivePaymentOptionBack());
    }

    const onNextPaymentStepHandler = () => {
        dispatch(cartActions.setActivePaymentOptionNext());
    }

    const onBackPaymentStepHandler = () => {
        dispatch(cartActions.setActivePaymentOptionBack());
    }

    return (
        <div>
            <div style={{ padding: 10 }}>
                <Grid columns='equal' >
                    <Grid.Column width={3}>
                        Contact
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {userValues.email}
                    </Grid.Column>
                    <Grid.Column width={3} style={{ textAlign: 'right' }}>
                        <p onClick={onChangeDetailsHandler} style={{ color: '#ffc107', cursor: 'pointer' }}>Change</p>
                    </Grid.Column>
                </Grid>
                <Divider />

                <Grid columns='equal'>
                    <Grid.Column width={3} >
                        Ship to
                    </Grid.Column>
                    <Grid.Column width={10}>
                        {userValues.address + ', ' + userValues.city + ', ' + userValues.postalCode + ', ' + userValues.country}
                    </Grid.Column>
                    <Grid.Column width={3} style={{ textAlign: 'right' }}>
                        <p onClick={onChangeDetailsHandler} style={{ color: '#ffc107', cursor: 'pointer' }}>Change</p>
                    </Grid.Column>
                </Grid>
            </div>

            <div style={{ padding: 10, marginBottom: 10 }}>
                <h3>Shipping Method</h3>
                <Grid columns='equal' style={{ marginTop: 10 }}>
                    <Grid.Column width={3}>
                        <Checkbox checked />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        International Shipping (7-21 business days)
                    </Grid.Column>
                    <Grid.Column width={3} style={{ textAlign: 'right' }}>
                        3.50$
                    </Grid.Column>
                </Grid>
            </div>

            <Button content='Back' icon='left arrow' labelPosition='left' secondary onClick={onBackPaymentStepHandler} />
            <Button content='Next' icon='right arrow' labelPosition='right' secondary onClick={onNextPaymentStepHandler} />
        </div>
    );
}

export default ShippingDetails;