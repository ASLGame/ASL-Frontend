import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Game } from "../home/homeSlice";
import { allGames } from "./gamesAPI";

interface gamesState {
  allGames: Array<Game> | undefined;
  allGamesState: string;
  searchText: string;
}

const initialState: gamesState = {
  allGames: [],
  allGamesState: "loading",
  searchText: "",
};

export const getAllGamesAsync = createAsyncThunk("games/all", async () => {
  const response = await allGames();
  return response;
});

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    changeSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGamesAsync.rejected, (state, action) => {
      state.allGamesState = "idle";
      console.log(action.error);
    });
    builder.addCase(getAllGamesAsync.pending, (state, action) => {
      state.allGamesState = "loading";
    });
    builder.addCase(getAllGamesAsync.fulfilled, (state, action) => {
      state.allGames = action.payload;
      state.allGamesState = "idle";
    });
  },
});

export const { changeSearchText } = gamesSlice.actions;
export const selectAllGames = (state: RootState) => state.games.allGames;
export const selectAllGamesState = (state: RootState) =>
  state.games.allGamesState;
export const selectSearchText = (state: RootState) => state.games.searchText;

export default gamesSlice.reducer;
