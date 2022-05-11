import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  getForgotPassword as getForgotPasswordAPI,
  initForgotPassword,
  resetPassword,
} from "./forgotPasswordIDAPI";

interface id {
  idExist: boolean;
  idExistState: string;
}

interface email {
  emailSent: boolean;
  emailSentState: string;
}

interface password {
  resetPassword: boolean;
  resetPasswordState: string;
}

interface resetPassword {
  id: string;
  password: string;
}

export interface forgotPassword {
  idExist: boolean;
  idExistState: string;
  emailSent: boolean;
  emailSentState: string;
  resetPassword: boolean;
  resetPasswordState: string;
}

const initialState: forgotPassword = {
  idExist: false,
  idExistState: "loading",
  emailSent: false,
  emailSentState: "idle",
  resetPassword: false,
  resetPasswordState: "idle",
};

export const getForgotPasswordAsync = createAsyncThunk(
  "forgotPassword/get",
  async (id: string) => {
    const response = await getForgotPasswordAPI(id);
    return response;
  }
);

export const initForgotPasswordAsync = createAsyncThunk(
  "forgotPassword/init",
  async (email: string) => {
    const response = await initForgotPassword(email);
    return response;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "forgotPassword/reset",
  async ({ id, password }: resetPassword) => {
    const response = await resetPassword(id, password);
    return response;
  }
);

export const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    setEmailSent: (state, action: PayloadAction<email>) => {
      state.emailSent = action.payload.emailSent;
      state.emailSentState = action.payload.emailSentState;
    },
    setIdExist: (state, action: PayloadAction<id>) => {
      state.idExist = action.payload.idExist;
      state.idExistState = action.payload.idExistState;
    },
    setResetPassword: (state, action: PayloadAction<password>) => {
      state.resetPassword = action.payload.resetPassword;
      state.resetPasswordState = action.payload.resetPasswordState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getForgotPasswordAsync.rejected, (state) => {
      state.idExist = false;
      state.idExistState = "rejected";
    });
    builder.addCase(getForgotPasswordAsync.pending, (state) => {
      state.idExistState = "loading";
    });
    builder.addCase(getForgotPasswordAsync.fulfilled, (state) => {
      state.idExist = true;
      state.idExistState = "idle";
    });
    builder.addCase(initForgotPasswordAsync.rejected, (state) => {
      state.emailSent = false;
      state.emailSentState = "rejected";
    });
    builder.addCase(initForgotPasswordAsync.pending, (state) => {
      state.emailSentState = "loading";
    });
    builder.addCase(initForgotPasswordAsync.fulfilled, (state) => {
      state.emailSent = true;
      state.emailSentState = "idle";
    });
    builder.addCase(resetPasswordAsync.rejected, (state) => {
      state.resetPassword = false;
      state.resetPasswordState = "rejected";
    });
    builder.addCase(resetPasswordAsync.pending, (state) => {
      state.resetPasswordState = "loading";
    });
    builder.addCase(resetPasswordAsync.fulfilled, (state) => {
      state.resetPassword = true;
      state.resetPasswordState = "idle";
    });
  },
});

export const { setEmailSent, setIdExist, setResetPassword } =
  forgotPasswordSlice.actions;

export const selectForgotPassword = (state: RootState) => state.forgotPassword;

export default forgotPasswordSlice.reducer;
