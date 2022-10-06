import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
    deleteClient: (state, action) => {},
  },
});

export const { setInitialState, addClient, setActualClient } = clientSlice.actions;
export default clientSlice.reducer;


export const getAllClients = () => async (dispatch) => {
  try {
    const data = await axios.get("http://localhost:4001/api/inventory/client");
    dispatch(setInitialState(data.data));
  } catch (err) {
    console.error(err);
  }
};

export const deleteClient = (data) => async (dispatch) => {
  try {
    await axios.put("http://localhost:4001/api/inventory/client/delete", data);
    dispatch(getAllClients());
  } catch (err) {
    console.error(err);
  }
}

export const createClient = (data) => async (dispatch) => {
  try {
    await axios.post("http://localhost:4001/api/inventory/client", data);
    dispatch(getAllClients());
  } catch (err) {
    console.error(err);
  }
}

export const updateClient = (data) => async (dispatch) => {
  try {
    console.log('aca upddatea')
    await axios.put("http://localhost:4001/api/inventory/client/update", data);
    dispatch(getAllClients());
  } catch (err) {
    console.error(err);
  }
}