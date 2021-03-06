/*
signinSlice.ts encompasses every action and reducer with respect to authorization. 
This means that both signin and signup methods will be found here.
*/
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { userChanges } from "../profile/components/tabMenu/components/editProfile/EditProfile";
import { uploadProfilePicture } from "../profile/profileAPI";
import { signup } from "../signup/signupAPI";
import { signin } from "./signinAPI";

export interface User {
  access_token?: string;
  account_email?: string;
  account_firstname?: string;
  account_lastname?: string;
  account_id?: number;
  account_role?: string;
  account_username?: string;
  account_created?: string;
  account_dob?: string;
  account_profile_picture?: string;
}

export interface SignInState {
  user: User | undefined; //object
  isAuth: true | false;
  userLoading: string;
}

export interface AuthError {
  message: string;
}

const initialState: SignInState = {
  user: undefined,
  isAuth: false,
  userLoading: "idle",
};

export const signinAsync = createAsyncThunk(
  "authorization/signin",
  async (user: object) => {
    const response = await signin(user);
    return response;
  }
);

export const signupAsync = createAsyncThunk(
  "authorization/signup",
  async (user: object) => {
    const response = await signup(user);
    return response;
  }
);

export const profilePictureUplaodAsync = createAsyncThunk(
  "profile/picture_upload",
  async ({
    form,
    uid,
    username,
  }: {
    form: FormData;
    uid: number;
    username: string;
  }) => {
    const response = await uploadProfilePicture(form, uid, username);
    return response;
  }
);

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    saveChanges: (state, action: PayloadAction<userChanges>) => {
      state.user!.account_firstname = action.payload.first_name;
      state.user!.account_lastname = action.payload.last_name;
      state.user!.account_dob = action.payload.DOB;
    },
    setLoading: (state, action: PayloadAction<string>) => {
      state.userLoading = action.payload;
    },
    signOut: (state) => {
      state.user = {};
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signinAsync.rejected, (state, action) => {
      state.userLoading = "rejected";
    });
    builder.addCase(signinAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
      state.userLoading = "idle";
    });
    builder.addCase(signupAsync.rejected, (state, action) => {
      state.userLoading = "rejected";
    });
    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(profilePictureUplaodAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(profilePictureUplaodAsync.fulfilled, (state, action) => {
      state.user!.account_profile_picture = `https://signy-asl-models.s3.amazonaws.com/profileImages/${state.user?.account_username}`;
    });
  },
});

//Export actions
export const { saveChanges, signOut, setLoading } = signinSlice.actions;

//Selecter allows us to select a value of the state
export const selectSignIn = (state: RootState) => state.signin.isAuth;
export const selectUser = (state: RootState) => state.signin.user;
export const selectSignInLoading = (state: RootState) =>
  state.signin.userLoading;

export default signinSlice.reducer;
