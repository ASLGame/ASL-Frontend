import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getscores } from './leaderboardAPI';
import { RootState } from '../../app/store';

export interface Score {
    date_achieved: string,
    game_id: number,
    account_id: number,
    id: number,
    score: number,
    username: string,
    name: string | undefined
}

export interface AllScores {
    scores: Array<Score> | undefined,
    state: string,
}

const initialState: AllScores = {
    scores: undefined,
    state: "loading",
}

export const getscoresAsync = createAsyncThunk(
    'getscores',
    async () => {
        const response = await getscores();
        return response;
    }
)

export const getscoresSlice = createSlice({
    name: "getscores",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getscoresAsync.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(getscoresAsync.pending, (state, action) => {
            state.state = "loading"
        })
        builder.addCase(getscoresAsync.fulfilled, (state, action) => {
            state.state = "idle"
            state.scores = action.payload;
        })
    }
})



export const selectScores = (state: RootState) => state.scores.scores
export const scoreState = (state: RootState) => state.scores.state
export default getscoresSlice.reducer;