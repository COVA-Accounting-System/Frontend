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
    editClient: (state, action) => {
      state.data = state.data.map((client) => {
        if (client._id === action.payload._id) {
          client = action.payload;
        }
        return client;
      });
    }
  },
});

export const { setInitialState, addClient, setActualClient, editClient } =
  clientSlice.actions;
export default clientSlice.reducer;


export const getAllClients = () => async (dispatch) => {
  try {
    const clients = await axios.get(API_URL);
    dispatch(setInitialState(clients.data));
  } catch (err) {
    console.error(err);
  }
};

export const createClient = (data) => async (dispatch) => {
  try {
    const newClient = await axios.post(API_URL, data);
    dispatch(addClient(newClient.data));
    return newClient.status;
  } catch (err) {
    console.error(err);
  }
};

export const deleteClient = (data) => async (dispatch) => {
  try {
    const deletedClient = await axios.put(`${API_URL}/delete`, data);
    dispatch(editClient(deletedClient.data));
    return deletedClient.status
  } catch (err) {
    console.error(err);
  }
};

export const updateClient = (data) => async (dispatch) => {
  try {
    const updatedClient = await axios.put(`${API_URL}/update`, data);
    dispatch(editClient(updatedClient.data));
    return updatedClient.status;
  } catch (err) {
    console.error(err);
  }
};
