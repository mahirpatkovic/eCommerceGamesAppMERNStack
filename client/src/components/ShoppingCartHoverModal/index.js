import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart';
import { makeStyles } from '@material-ui/core/styles';

import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    DialogTitle,
    Card,
    CardContent,
    CardMedia,
    Typography,
    ButtonGroup,
} from '@material-ui/core';
import { Divider, Header } from 'semantic-ui-react';

import ClearIcon from '@material-ui/icons/Clear';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useHistory } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginBottom: 10,
        height: 'auto',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        height: 'auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));
function ShoppingCartHoverModal(props) {
    const [isLoginAlertVisible, setIsLoginAlertVisible] = useState(false);
    const cartGames = useSelector((state) => state.cart.addedGamesToCart);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const isUserLoggedIn = useSelector((state) => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    const removeGameFromCart = (gm) => {
        if (cartGames.length > 1) {
            dispatch(cartActions.removeFromCart(gm.game._id));
        } else {
            dispatch(cartActions.removeFromCart(gm.game._id));
            props.onClose();
        }
    };

    const increaseGameQuantityHandler = (gm) => {
        dispatch(cartActions.increaseGameQuantityHandler(gm));
    };

    const decreaseGameQuantityHandler = (gm) => {
        dispatch(cartActions.decreaseGameQuantityHandler(gm));
    };

    const checkoutProceedHandler = () => {
        if (isUserLoggedIn) {
            // console.log("Checkout", cartGames);
            history.push('/checkout');
            props.onClose();
        } else {
            setIsLoginAlertVisible(true);
        }
    };

    return (
        <Dialog open={props.visible} onClose={props.onClose}>
            <DialogTitle>
                <Divider horizontal>
                    <Header as="h4">
                        <ShoppingCartIcon /> Shopping Cart
                    </Header>
                </Divider>
            </DialogTitle>
            <DialogContent>
                {cartGames.map((gm) => {
                    return (
                        <Card className={classes.root} key={gm.game._id}>
                            <CardMedia
                                className={classes.cover}
                                image={gm.game.poster}
                                title={gm.game.name}
                            />
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {gm.game.name}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="textSecondary"
                                    >
                                        Price:{' '}
                                        <strong>{`${Number(
                                            gm.game.price
                                        ).toFixed(2)} $`}</strong>
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="textSecondary"
                                    >
                                        Total price:{' '}
                                        <strong>{`${Number(
                                            gm.totalPrice
                                        ).toFixed(2)} $`}</strong>
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="textSecondary"
                                    >
                                        Quantity:{' '}
                                        <strong>{gm.gameQuantity}</strong>
                                    </Typography>
                                    <ButtonGroup>
                                        <Button
                                            onClick={() =>
                                                decreaseGameQuantityHandler(gm)
                                            }
                                            aria-label="reduce"
                                            size="small"
                                        >
                                            <RemoveIcon fontSize="small" />
                                        </Button>
                                        <Button
                                            onClick={() =>
                                                increaseGameQuantityHandler(gm)
                                            }
                                            aria-label="increase"
                                            size="small"
                                        >
                                            <AddIcon fontSize="small" />
                                        </Button>
                                    </ButtonGroup>
                                </CardContent>
                            </div>
                            <ClearIcon
                                onClick={() => removeGameFromCart(gm)}
                                style={{
                                    cursor: 'pointer',
                                    margin: '0px 0 0px auto',
                                }}
                            />
                        </Card>
                    );
                })}
            </DialogContent>
            {isLoginAlertVisible && (
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    Shop only available for members —{' '}
                    <strong> Please register first !</strong>
                </Alert>
            )}
            <Divider />
            <Typography style={{ marginLeft: 20 }} variant="h6">
                Total: <strong>{totalPrice.toFixed(2)} $</strong>
            </Typography>
            <DialogActions style={{ marginTop: -35 }}>
                <Button
                    autoFocus
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={checkoutProceedHandler}
                >
                    Checkout
                </Button>
                <Button
                    autoFocus
                    onClick={props.onClose}
                    variant="contained"
                    size="small"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ShoppingCartHoverModal;
