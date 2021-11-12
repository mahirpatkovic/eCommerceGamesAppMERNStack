import React from 'react';
import './style.css';
import PaymentProgress from './PaymentProgress';

function Checkout() {
    return (
        <div style={{ display: 'flex' }}>
            <div className="checkoutPage">
                <PaymentProgress />
                <br/> <br/>
            </div>
        </div >
    )
}

export default Checkout;