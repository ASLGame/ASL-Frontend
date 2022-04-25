import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getAchievements, getLatestPlayed, getScores } from "./profileAPI";

export interface GameScore {
  date_achieved: string;
  name: string;
  score: number;
  id: number;
}

export interface UserAchievements {
  name: string;
  stats_id: number;
  achievement_id: number;
  acc_ach_id: number;
  game_id: number;
  task: number;
  value: number;
  has_achieved: boolean;
  date_achieved: Date;
}

export interface UserProfile {
  scores: Array<GameScore> | undefined;
  latestPlayed: Array<GameScore> | undefined;
  achievements: Array<UserAchievements> | undefined;
  newlatestPlayed: string;
  newScores: string;
  newAchievements: string;
}

const initialState: UserProfile = {
  scores: undefined,
  latestPlayed: undefined,
  achievements: undefined,
  newlatestPlayed: "loading",
  newScores: "idle",
  newAchievements: "idle",
};

export const lastestPlayedAsync = createAsyncThunk(
  "latestPlayed",
  async (uid: number) => {
    const response = await getLatestPlayed(uid);
    return response;
  }
);

export const scoresAsync = createAsyncThunk("scores", async (uid: number) => {
  const response = await getScores(uid);
  return response;
});

export const achievementsAsync = createAsyncThunk(
  "achievements",
  async (uid: number) => {
    const response = await getAchievements(uid);
    return response;
  }
);

export const userProfileSlice = createSlice({
  name: "latestPlayed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(lastestPlayedAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(lastestPlayedAsync.pending, (state, action) => {
      state.newlatestPlayed = "loading";
    });
    builder.addCase(lastestPlayedAsync.fulfilled, (state, action) => {
      state.newlatestPlayed = "idle";
      state.latestPlayed = action.payload;
    });
    builder.addCase(scoresAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(scoresAsync.pending, (state, action) => {
      state.newScores = "loading";
    });
    builder.addCase(scoresAsync.fulfilled, (state, action) => {
      state.newScores = "idle";
      state.scores = action.payload;
    });
    builder.addCase(achievementsAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(achievementsAsync.pending, (state, action) => {
      state.newAchievements = "loading";
    });
    builder.addCase(achievementsAsync.fulfilled, (state, action) => {
      state.newAchievements = "idle";
      state.achievements = action.payload;
    });
  },
});

export const selectLatestPlayed = (state: RootState) =>
  state.userProfile.latestPlayed;
export const selectNewLatestPlayed = (state: RootState) =>
  state.userProfile.newlatestPlayed;
export const selectScores = (state: RootState) => state.userProfile.scores;
export const selectNewScores = (state: RootState) =>
  state.userProfile.newScores;
export const selectAchievements = (state: RootState) =>
  state.userProfile.achievements;
export const selectNewAchievements = (state: RootState) =>
  state.userProfile.newAchievements;
export default userProfileSlice.reducer;
