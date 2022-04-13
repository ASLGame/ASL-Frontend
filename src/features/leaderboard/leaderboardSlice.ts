import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getscores, gettoday, getweekly, getyesterday } from './leaderboardAPI';
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
    today: Array<Score> | undefined,
    yesterday: Array<Score> | undefined,
    weekly: Array<Score> | undefined,
    state: string,
}

const initialState: AllScores = {
    scores: undefined,
    today: undefined,
    yesterday: undefined,
    weekly: undefined,
    state: "loading",
}

export const getscoresAsync = createAsyncThunk(
    'getscores',
    async () => {
        const response = await getscores();
        return response;
    }
)

export const getyesterdayAsync = createAsyncThunk(
    'getyesterday',
    async () => {
        const response = await getyesterday();
        return response;
    }
)

export const gettodayAsync = createAsyncThunk(
    'gettoday',
    async () => {
        const response = await gettoday();
        return response;
    }
)

export const getweeklyAsync = createAsyncThunk(
    'getweekly',
    async () => {
        const response = await getweekly();
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
        builder.addCase(getyesterdayAsync.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(getyesterdayAsync.pending, (state, action) => {
            state.state = "loading"
        })
        builder.addCase(getyesterdayAsync.fulfilled, (state, action) => {
            state.state = "idle"
            state.yesterday = action.payload;
        })
        builder.addCase(gettodayAsync.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(gettodayAsync.pending, (state, action) => {
            state.state = "loading"
        })
        builder.addCase(gettodayAsync.fulfilled, (state, action) => {
            state.state = "idle"
            state.today = action.payload;
        })
        builder.addCase(getweeklyAsync.rejected, (state, action) => {
            console.log(action.error)
        })
        builder.addCase(getweeklyAsync.pending, (state, action) => {
            state.state = "loading"
        })
        builder.addCase(getweeklyAsync.fulfilled, (state, action) => {
            state.state = "idle"
            state.weekly = action.payload;
        })
    }
})



export const selectScores = (state: RootState) => state.scores.scores
export const selectYesterday = (state: RootState) => state.scores.yesterday
export const selectToday = (state: RootState) => state.scores.today
export const selectWeekly = (state: RootState) => state.scores.weekly
export const scoreState = (state: RootState) => state.scores.state
export default getscoresSlice.reducer;