import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  docs: [],
  filters: {},
  slots:[]
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setFilters: (state, action) => {
        state.filters = action.payload
    },
    setSlots: (state, action) => {
        state.slots = action.payload
    }
  },

});

export const { setFilters, setSlots } = counterSlice.actions;


export default counterSlice.reducer;
