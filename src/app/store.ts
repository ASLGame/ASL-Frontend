import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import signinReducer from "../features/signin/signinSlice";
import homeReducer from "../features/home/homeSlice";
import userProfile from "../features/profile/profileSlice";
import gamesReducer from "../features/games/gamesSlice";
import getscoreReducer from "../features/leaderboard/leaderboardSlice";
import gameReducer from "../features/game/gameSlice";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  signin: signinReducer,
  home: homeReducer,
  scores: getscoreReducer,
  games: gamesReducer,
  userProfile: userProfile,
  game: gameReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: true,
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
