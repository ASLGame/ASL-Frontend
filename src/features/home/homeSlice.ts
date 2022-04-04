import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { newestGame, featuredGames } from "./homeAPI";
import { Game } from "../../types/Game";


interface homeState {
  featuredGames: Array<Game> | undefined;
  newestGame: Game | undefined;
  newestGameState: string;
  featuredGamesState: string;
}

const initialState: homeState = {
  featuredGames: [],
  newestGame: undefined,
  newestGameState: "loading",
  featuredGamesState: "loading",
};

export const getNewestGameAsync = createAsyncThunk("game/new", async () => {
  const response = await newestGame();
  return response;
});

export const getFeaturedGamesAsync = createAsyncThunk(
  "games/featured",
  async () => {
    const response = await featuredGames();
    return response;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewestGameAsync.rejected, (state, action) => {
      state.newestGameState = "idle";
      console.log(action.error);
    });
    builder.addCase(getNewestGameAsync.pending, (state, action) => {
      state.newestGameState = "loading";
    });
    builder.addCase(getNewestGameAsync.fulfilled, (state, action) => {
      state.newestGameState = "idle";
      state.newestGame = action.payload;
    });
    builder.addCase(getFeaturedGamesAsync.rejected, (state, action) => {
      state.featuredGamesState = "idle";
      console.log(action.error);
    });
    builder.addCase(getFeaturedGamesAsync.pending, (state, action) => {
      state.featuredGamesState = "loading";
      state.featuredGames = action.payload;
    });
    builder.addCase(getFeaturedGamesAsync.fulfilled, (state, action) => {
      state.featuredGamesState = "idle";
      state.featuredGames = action.payload;
    });
  },
});

export const selectNewestGame = (state: RootState) => state.home.newestGame;
export const selectNewestGameState = (state: RootState) =>
  state.home.newestGameState;
export const selectFeaturedGames = (state: RootState) =>
  state.home.featuredGames;

export const selectFeaturedGamesState = (state: RootState) =>
  state.home.featuredGamesState;

export default homeSlice.reducer;
