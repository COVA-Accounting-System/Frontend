import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4001/api/inventory/provider";

const initialState = {
  data: [],
  actualProvider: {},
};

const providerSlice = createSlice({
  name: "provider",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
      state.data = action.payload;
    },
    setActualProvider: (state, action) => {
      state.actualProvider = action.payload;
    },
    addProvider: (state, action) => {
      state.data.push(action.payload);
    },
    editProvider: (state, action) => {
      state.data = state.data.map((provider) => {
        if (provider._id === action.payload._id) {
          provider = action.payload;
        }
        return provider;
      });
    }
  },
});

export const { setInitialState, addProvider, setActualProvider, editProvider } =
  providerSlice.actions;
export default providerSlice.reducer;

export const getAllProviders = () => async (dispatch) => {
  try {
    const providers = await axios.get(API_URL);
    dispatch(setInitialState(providers.data));
  } catch (err) {
    console.error(err);
  }
};

export const createProvider = (data) => async (dispatch) => {
  try {
    const newProvider = await axios.post(API_URL, data);
    dispatch(addProvider(newProvider.data));
    return newProvider.status;
  } catch (err) {
    console.error(err);
  }
};

export const deleteProvider = (data) => async (dispatch) => {
  try {
    const deletedProvider = await axios.put(`${API_URL}/delete`, data);
    dispatch(editProvider(deletedProvider.data));
    return deletedProvider.status;
  } catch (err) {
    console.error(err);
  }
};

export const updateProvider = (data) => async (dispatch) => {
  try {
    const updatedProvider = await axios.put(`${API_URL}/update`, data);
    dispatch(editProvider(updatedProvider.data));
    return updatedProvider.status;
  } catch (err) {
    console.error(err);
  }
};
