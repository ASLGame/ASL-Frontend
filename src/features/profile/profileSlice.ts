import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getLatestPlayed, getScores } from './profileAPI';

export interface GameScore {
    date_achieved: string,
    name: string,
    score: number,
    id: number
}

export interface UserProfile {
    scores: Array<GameScore> | undefined
    latestPlayed: Array<GameScore> | undefined
    newlatestPlayed: string,
    newScores: string
}

const initialState: UserProfile = {
    scores: undefined,
    latestPlayed: undefined,
    newlatestPlayed: "loading",
    newScores: "idle"
}

export const lastestPlayedAsync = createAsyncThunk(
    'latestPlayed',
    async (uid: number) => {
        const response = await getLatestPlayed(uid);
        return response;
    }
)

export const scoresAsync = createAsyncThunk(
    'scores',
    async (uid: number) => {
        const response = await getScores(uid);
        return response;
    }
)

export const latestPlayedSlice = createSlice({
    name: "latestPlayed",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(lastestPlayedAsync.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(lastestPlayedAsync.pending, (state, action) => {
            state.newlatestPlayed = "loading"
        })
        builder.addCase(lastestPlayedAsync.fulfilled, (state, action) => {
            state.newlatestPlayed = "idle"
            state.latestPlayed = action.payload;
        })
        builder.addCase(scoresAsync.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(scoresAsync.pending, (state, action) => {
            state.newScores = "loading"
        })
        builder.addCase(scoresAsync.fulfilled, (state, action) => {
            state.newScores = "idle"
            state.scores = action.payload;
        })
    }
})

export const selectLatestPlayed = (state: RootState) => state.userProfile.latestPlayed;
export const selectNewLatestPlayed = (state: RootState) => state.userProfile.newlatestPlayed;
export const selectScores = (state: RootState) => state.userProfile.scores;
export const selectNewScores = (state: RootState) => state.userProfile.newScores;
export default latestPlayedSlice.reducer;