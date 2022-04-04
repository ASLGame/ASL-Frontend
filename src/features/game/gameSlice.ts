import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { game, postScore } from "./gameAPI";
import { Game } from "../../types/Game";
import { scorePost } from "../../types/Score"

interface gameState {
    game: Game | undefined;
}

const initialState: gameState = {
    game: undefined,
}

export const postScoreAsync = createAsyncThunk(
    "score/post",
    async(scorePost: scorePost) => {
        const response = await postScore(scorePost);
        return response;
    }
)

export const gameSlice = createSlice({
    name: "game",
    initialState, 
    reducers: {
        setGame: (state, action: PayloadAction<Game>) => {
            state.game = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postScoreAsync.rejected, (state, action) => {
            console.log(action.error);
        });
    }
});

// Export actions
export const { setGame } =gameSlice.actions;

// Selector allows us to select a value of the state
export const selectGame = (state: RootState) => state.game

export default gameSlice.reducer;


