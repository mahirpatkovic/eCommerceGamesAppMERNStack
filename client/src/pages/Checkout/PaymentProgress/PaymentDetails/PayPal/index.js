import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { notification } from 'antd';
import { cartActions } from '../../../../../store/cart';
import { useHistory } from 'react-router-dom';
import Service from '../../../../../api/service';

function PayPal() {
    const paypal = useRef();
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const totalDiscountPrice = useSelector(
        (state) => state.cart.totalDiscountPrice
    );
    const user = useSelector((state) => state.cart.userInfoPaymentDetails);
    const cartGames = useSelector((state) => state.cart.addedGamesToCart);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let orderedGames = [];
        for (let game of cartGames) {
            const tmpGm = {
                gameId: game.game._id,
                gameQuantity: game.gameQuantity,
                totalPrice:
                    totalDiscountPrice === 0
                        ? game.totalPrice
                        : game.totalPrice - game.totalPrice * 0.2,
            };
            orderedGames.push(tmpGm);
        }
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: 'Games ordered',
                                amount: {
                                    currency_code: 'USD',
                                    value:
                                        totalDiscountPrice === 0
                                            ? totalPrice + 3.5
                                            : totalDiscountPrice + 3.5,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();

                    Service.createPayment({
                        paymentDetails: order.purchase_units,
                        userShippingDetails: user,
                        gameDetails: orderedGames,
                        isPaypal: true,
                    })
                        .then((res) => {
                            notification.open({
                                message: res.data.message,
                                icon: (
                                    <Icon
                                        name="check circle outline"
                                        style={{ color: '#ffc107' }}
                                    />
                                ),
                            });

                            dispatch(cartActions.paymentCompleted());
                            history.push('/');
                            localStorage.removeItem('__paypal_storage__');
                        })
                        .catch((err) => {
                            notification.open({
                                message: 'Payment Failed',
                                icon: (
                                    <Icon
                                        name="exclamation"
                                        style={{ color: 'red' }}
                                    />
                                ),
                            });
                            console.error(err);
                        });
                },
                onError: (err) => {
                    console.log(err);
                    notification.open({
                        message: 'Payment Failed',
                        icon: (
                            <Icon name="exclamation" style={{ color: 'red' }} />
                        ),
                    });
                },
            })
            .render(paypal.current);
    }, [cartGames, dispatch, history, totalDiscountPrice, totalPrice, user]);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}

export default PayPal;
