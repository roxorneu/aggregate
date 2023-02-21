// addToList adds the trip viewer has expressed interest in to the list (value) linked to viewerID (key) in state
// removeFromList removes trip user has revoked interest in from the state

import { createSlice } from "@reduxjs/toolkit";

const interestSlice = createSlice({
  name: "tripsList",
  initialState: {},
  reducers: {
    addToList(state, action) {
      Object.keys(action.payload).forEach((key) => {
        var value = action.payload[key];
        if (key in state) {
          var arr = state[key];
          if (!arr.includes(value)) {
            arr.push(value);
            state[key] = arr;
          }
        } else {
          state[key] = [action.payload[key]];
        }
      });

      return state;
    },
    removeFromList(state, action) {
      var viewerID = Object.keys(action.payload)[0];
      var tripIDToRemove = action.payload[viewerID];
      var arr = state[viewerID];
      if (arr.includes(tripIDToRemove)) {
        arr = arr.filter((item) => item !== tripIDToRemove);
        state[viewerID] = arr;
      }
      return state;
      // to do - remove from mongodb as well
    },
  },
});

export const { addToList, removeFromList } = interestSlice.actions;

export default interestSlice.reducer;
