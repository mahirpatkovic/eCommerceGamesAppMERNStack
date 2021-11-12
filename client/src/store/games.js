import { createSlice } from '@reduxjs/toolkit';

const initialGamesState = {
    games: [],
};
const gamesSlice = createSlice({
    name: 'fetchGames',
    initialState: initialGamesState,
    reducers: {
        fetchGames(state, { payload: games }) {
            state.games = games;
        },
        addNewGame(state, { payload: game }) {
            state.games = [...state.games, game];
        },
    },
});
export const gamesActions = gamesSlice.actions;

export default gamesSlice.reducer;
