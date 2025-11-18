import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state, empty array of users
const initialState = { user: [], status: "idle", error: null };

// get Users from api using asyncThunk and axios
export const getUsers = createAsyncThunk("user/getUser", async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log(data);
  return data;
});

// create a new user
export const createNewUser = createAsyncThunk("user/newUser", async (user) => {
  const { data } = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    user
  );
  return data;
});

// update user
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updatedData }) => {
    const { data } = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedData
    );
    return data;
  }
);

// delete User
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  return id; // return deleted user id
});

// creating user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createNewUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.user.push(action.payload);
        state.status = "idle";
      })
      .addCase(createNewUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.user.findIndex((u) => u.id === action.payload.id);

        if (index !== -1) {
          state.user[index] = action.payload;
        }

        state.status = "idle";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter((u) => u.id !== action.payload);
        state.status = "idle";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
