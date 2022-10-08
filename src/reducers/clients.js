import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/client";

const initialState = {
  data: [],
  actualClient: {},
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload;
    },
    setActualClient: (state, action) => {
      state.actualClient = action.payload;
    },
    addClient: (state, action) => {
      state.data.push(action.payload);
    },
    removeClient: (state, action) => {
      state.data = state.data.map((client) => {
        if (client._id === action.payload._id) {
          client.isVisible = false;
        }
        return client;
      });
    },
  },
});

export const { setInitialState, addClient, setActualClient, removeClient } =
  clientSlice.actions;
export default clientSlice.reducer;

export const getAllClients = () => async (dispatch) => {
  try {
    const data = await axios.get(API_URL);
    dispatch(setInitialState(data.data));
  } catch (err) {
    console.error(err);
  }
};

export const createClient = (data) => async (dispatch) => {
  try {
    await axios.post(API_URL, data);
    dispatch(getAllClients());
  } catch (err) {
    console.error(err);
  }
};

export const deleteClient = (data) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/delete`, data);
    dispatch(removeClient(data));
  } catch (err) {
    console.error(err);
  }
};

export const updateClient = (data) => async (dispatch) => {
  try {
    await axios.put(`${API_URL}/update`, data);
    dispatch(getAllClients());
  } catch (err) {
    console.error(err);
  }
};
