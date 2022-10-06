import { createSlice } from "@reduxjs/toolkit";

const crudSlice = createSlice({
    name: "crud",
    initialState: {
        action: "",
        entity: "",
        entityName: ""
    },
    reducers: {
        changeAction: (state, action) => {
            state.action = action.payload;
        },
        changeEntity: (state, action) => {
            state.entity = action.payload.entity
            state.entityName = action.payload.entityName
        }
    }
})


export const { changeAction, changeEntity } = crudSlice.actions;
export default crudSlice.reducer;