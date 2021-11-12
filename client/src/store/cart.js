import { createSlice } from '@reduxjs/toolkit';

const initialCartState = {
    addedGamesToCart: [],
    totalPrice: 0,
    totalDiscountPrice: 0,
    gameAlreadyInCart: false,
    activePaymentStep: 0,
    userInfoPaymentDetails: [],
    cartPaymentDetails: [],
    isDiscountApplied: false,
};
const cartSlice = createSlice({
    name: 'addToCartGames',
    initialState: initialCartState,
    reducers: {
        addToCart(state, { payload: game }) {
            const existingCartItemIndex = state.addedGamesToCart.findIndex(
                (gm) => gm.game._id === game.game._id
            );
            if (existingCartItemIndex === -1) {
                state.addedGamesToCart.push({
                    ...game,
                    totalPrice: game.game.price * game.gameQuantity,
                });
            } else {
                state.gameAlreadyInCart = true;
                // const newIndex = state.addedGamesToCart.findIndex(gm => gm.game.id === game.game.id);
                // const newIndexGame = state.addedGamesToCart[newIndex];
                state.addedGamesToCart[existingCartItemIndex] = {
                    ...game,
                    totalPrice: game.game.price * game.gameQuantity,
                };
            }
            const newState = state.addedGamesToCart
                .map((gm) => gm.totalPrice)
                .reduce((a, b) => a + b, 0);
            state.totalPrice = newState;
        },
        removeFromCart(state, { payload: gameId }) {
            state.addedGamesToCart = state.addedGamesToCart.filter(
                (gm) => gm.game._id !== gameId
            );
            const newState = state.addedGamesToCart
                .map((gm) => gm.totalPrice)
                .reduce((a, b) => a + b, 0);
            state.totalPrice = newState;
            state.totalDiscountPrice = newState - newState * 0.2;
        },
        isGameAlredyInCartHandleClose(state) {
            state.gameAlreadyInCart = false;
        },
        increaseGameQuantityHandler(state, { payload: game }) {
            const existingCartItemIndex = state.addedGamesToCart.findIndex(
                (gm) => gm.game._id === game.game._id
            );
            if (game.game.quantity > game.gameQuantity) {
                state.addedGamesToCart[existingCartItemIndex].gameQuantity++;
                const gameTotalPrice = (state.addedGamesToCart[
                    existingCartItemIndex
                ].totalPrice =
                    game.gameQuantity * game.game.price + game.game.price);
                state.addedGamesToCart[existingCartItemIndex].totalPrice =
                    gameTotalPrice;
                const newState = state.addedGamesToCart
                    .map((gm) => gm.totalPrice)
                    .reduce((a, b) => a + b, 0);
                state.totalPrice = newState;
                state.totalDiscountPrice = newState - newState * 0.2;
            }
        },
        decreaseGameQuantityHandler(state, { payload: game }) {
            const existingCartItemIndex = state.addedGamesToCart.findIndex(
                (gm) => gm.game._id === game.game._id
            );
            if (
                state.addedGamesToCart[existingCartItemIndex].gameQuantity > 1
            ) {
                state.addedGamesToCart[existingCartItemIndex].gameQuantity--;
                const gameTotalPrice = (state.addedGamesToCart[
                    existingCartItemIndex
                ].totalPrice =
                    game.gameQuantity * game.game.price - game.game.price);
                state.addedGamesToCart[existingCartItemIndex].totalPrice =
                    gameTotalPrice;
                const newState = state.addedGamesToCart
                    .map((gm) => gm.totalPrice)
                    .reduce((a, b) => a + b, 0);
                state.totalPrice = newState;
                state.totalDiscountPrice = newState - newState * 0.2;
            }
        },
        discountHandler(state) {
            state.totalDiscountPrice =
                state.totalPrice - state.totalPrice * 0.2;
        },
        setActivePaymentOptionNext(state) {
            state.activePaymentStep++;
        },
        setActivePaymentOptionBack(state) {
            state.activePaymentStep--;
        },
        setUserInfoPaymentDetails(state, { payload: values }) {
            state.userInfoPaymentDetails = values;
        },
        setCardPaymentDetails(state, { payload: values }) {
            state.cartPaymentDetails = values;
        },
        paymentCompleted(state) {
            state.addedGamesToCart = [];
            state.totalPrice = 0;
            state.totalDiscountPrice = 0;
            state.gameAlreadyInCart = false;
            state.activePaymentStep = 0;
            state.userInfoPaymentDetails = [];
            state.cartPaymentDetails = [];
            state.isDiscountApplied = false;
        },
        setAppliedDiscount(state) {
            state.isDiscountApplied = true;
        },
    },
});
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
