import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetchdata", async () => {
  const response = await fetch("https://api.github.com/users/Student-pukhraj");
  const data = response.json();
  return data;
});

type Items = {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  blog: string;
  location: string;
  email?: string;
  bio: string;
  html_url: string;
  public_repos: number;
  followers: number;
};

interface initialState {
  isLoading: boolean;
  items: Items;
  error: boolean;
}

const initialState = {
  isLoading: false,
  items: {
    login: "",
    id: null,
    avatar_url: "",
    name: "",
    blog: "",
    location: "",
    email: "",
    bio: "",
    html_url: "",
    public_repos: null,
    followers: null,
  },
  error: false,
};

const dataslice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchData.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        const newData = {
          ...action.payload,
          email: action?.payload?.email
            ? action?.payload?.email
            : "pukhrajjharotiya15@gmail.com",
        };
        state.items = newData;
      })
      .addCase(fetchData.rejected, (state, _) => {
        state.isLoading = false;
        state.error = true;
      }),
});

export default dataslice.reducer;
