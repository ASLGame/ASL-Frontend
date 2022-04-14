import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getGame, getStat, postScore } from "./gameAPI";
import { Game } from "../../types/Game";
import { scorePost } from "../../types/Score";

export interface Stat {
  stat_id: number,
  name: string,
  description: string,
  type: string
}

interface gameState {
  game: Game | undefined;
  stats: Array<Stat> | undefined
}

const initialState: gameState = {
  game: undefined,
  stats: undefined
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

export const getStatAsync = createAsyncThunk(
  "stat/get",
  async (stat: string) => {
    const response = await getStat(stat);
    return response
  }
) 

// export const addToStatAsync = createAsyncThunk(
//   "stat/post",
//   async (stat: object) => {
//     const response = await addToStat(stat);
//     return response;
//   }
// )

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
    builder.addCase(getStatAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(getStatAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      state.stats = action.payload;
    });
  },
});

// Export actions
export const { setGame } = gameSlice.actions;

// Selector allows us to select a value of the state
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
