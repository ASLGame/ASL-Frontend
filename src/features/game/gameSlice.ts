import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getGame,
  getGameAchievements,
  getStat,
  postScore,
  updateAccountStat,
} from "./gameAPI";
import { Game } from "../../types/Game";
import { scorePost } from "../../types/Score";

export interface Stat {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface accountStat {
  id?: number;
  account_id: number;
  stats_id: number;
  value?: number;
}

interface GameAchievement {
  id: number;
  name: string;
  stats_id: number;
  game_id: number;
  type: string;
  task: number;
  description: string;
}

interface gameState {
  game: Game | undefined;
  stats: Array<Stat> | undefined;
  accountStatLoading: boolean;
  accountStat: accountStat | undefined;
  achievements: Array<GameAchievement> | undefined;
}

const initialState: gameState = {
  game: undefined,
  stats: undefined,
  accountStatLoading: false,
  accountStat: undefined,
  achievements: undefined,
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
    return response;
  }
);

export const updateAccountStatAsync = createAsyncThunk(
  "accountStat/update",
  async ({ stat, value }: { stat: accountStat; value: object }) => {
    const response = await updateAccountStat(stat, value);
    return response;
  }
);

export const getGameAchievementsAsync = createAsyncThunk(
  "gameAchievement/get",
  async (gameID: string) => {
    const response = await getGameAchievements(gameID);
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
    builder.addCase(updateAccountStatAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(updateAccountStatAsync.pending, (state, action) => {
      state.accountStatLoading = true;
    });
    builder.addCase(updateAccountStatAsync.fulfilled, (state, action) => {
      state.accountStat = action.payload;
      state.accountStatLoading = false;
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
