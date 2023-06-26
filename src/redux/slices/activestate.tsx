/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const generateInitialState = (): any => {
  const initialState: any = {
    currentSelectedUI: '',
    selectedOption: 'Editor',
    nodeIDs: {
      uuid: null,
      workSpaceUUID: null,
    },
    navigationPathArray: [{}],
    isMoveto: false,
    currentMoveToItem: {},
    copyOrMove: '',
    groupBy: false,
    groupByOption: '',
  };
  return initialState;
};
export const activestateSlice = createSlice({
  name: 'activestate',
  initialState: generateInitialState(),
  reducers: {
    setCurrentSelectedUI: (state, action: PayloadAction<any>) => {
      state.currentSelectedUI = action.payload;
    },
    setSelectedOption: (state, action: PayloadAction<any>) => {
      state.selectedOption = action.payload;
    },
    setNodeIDs: (state, action: PayloadAction<any>) => {
      state.nodeIDs = action.payload;
    },
    setNavigationPath: (state, action: PayloadAction<any>) => {
      if (action.payload === null) {
        state.navigationPathArray = [];
      } else {
        state.navigationPathArray?.unshift(action.payload?.name);
      }
    },
    updateNavigationPath: (state, action: PayloadAction<any>) => {
      const copy = [...state.navigationPathArray];
      copy[0] = action.payload;
      state.navigationPathArray = copy;
      console.log(copy);
    },
    setIsMoveTo: (state, action: PayloadAction<any>) => {
      state.isMoveto = action.payload;
    },
    setCurrentMoveToItem: (state, action: PayloadAction<any>) => {
      state.currentMoveToItem = action.payload;
    },
    setCopyOrMove: (state, action: PayloadAction<any>) => {
      state.copyOrMove = action.payload;
    },
    setGroupBy: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'asdfg;lk');
      state.groupBy = action.payload;
    },
    setGroupByOption: (state, action: PayloadAction<any>) => {
      console.log(action.payload, 'asdfg;lk');
      state.groupByOption = action.payload;
    },
  },
});
export const {
  setCurrentSelectedUI,
  setSelectedOption,
  setNodeIDs,
  setNavigationPath,
  setIsMoveTo,
  setCurrentMoveToItem,
  setCopyOrMove,
  updateNavigationPath,
  setGroupBy,
  setGroupByOption,
} = activestateSlice.actions;
export default activestateSlice.reducer;
