import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getGame, getGameAchievements, getStat, postScore, updateStat } from "./gameAPI";
import { Game } from "../../types/Game";
import { scorePost } from "../../types/Score";
import { AccountStat } from "../../types/AccountStat";

export interface Stat {
  id: number,
  name: string,
  description: string,
  type: string
}

interface GameAchievement {
  id: number,
  name: string,
  stats_id: number,
  game_id: number,
  type: string,
  task: number,
  description: string
}

interface gameState {
  game: Game | undefined;
  stats: Array<Stat> | undefined
  achievements: Array<GameAchievement> | undefined
}

const initialState: gameState = {
  game: undefined,
  stats: undefined,
  achievements: undefined
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

export const updateStatAsync = createAsyncThunk(
  "stat/update",
  async ({stat, value}: {stat: AccountStat, value: number}) => {
    const response = await updateStat(stat, value);
    return response
  }
)

export const getGameAchievementsAsync = createAsyncThunk(
  "game_achievement/get",
  async (gameID: string) => {
    const response = await getGameAchievements(gameID);
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
    builder.addCase(updateStatAsync.rejected, (state, action) => {
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
      state.stats = action.payload;
    });
    builder.addCase(getGameAchievementsAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(getGameAchievementsAsync.fulfilled, (state, action) => {
      state.achievements = action.payload;
    });
  },
});

// Export actions
export const { setGame } = gameSlice.actions;

// Selector allows us to select a value of the state
export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
