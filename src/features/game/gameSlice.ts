import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getGame, postScore } from "./gameAPI";
import { Game } from "../../types/Game";
import { scorePost } from "../../types/Score";

interface gameState {
  game: Game | undefined;
}

const initialState: gameState = {
  game: undefined,
};

export const getGameAsync = createAsyncThunk(
  "game/selected",
  async (name: String) => {
    const response = await getGame(name);
    return response;
  }
);

export const postScoreAsync = createAsyncThunk(
  "score/post",
  async (scorePost: scorePost) => {
    const response = await postScore(scorePost);
    return response;
  }
);

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
    builder.addCase(getGameAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(getGameAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.game = action.payload;
    });
  },
});

// Export actions
export const { setGame } = gameSlice.actions;

// Selector allows us to select a value of the state
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
