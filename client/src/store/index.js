import { configureStore } from "@reduxjs/toolkit";

import authReducer from './auth';
import cartReducer from './cart';
import gamesReducer from './games';

const store = configureStore({
    reducer: { auth: authReducer, cart: cartReducer, games: gamesReducer }
})

export default store;