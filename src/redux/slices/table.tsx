/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import CircularImageComponent from 'components/ListView/ListViewComponents/CircularImageComponent';

export const generateInitialTableState = (): any => {
  const columnsArray = [
    {
      Header: '#',
      accessor: (row, index) => index + 1,
    },
    {
      Header: 'Account Name',
      accessor: 'account_name',
    },
    {
      Header: 'Account ID',
      accessor: 'account_id',
    },
    {
      Header: 'Annual Revenue',
      accessor: 'annual_revenue',
    },
    {
      Header: 'Score',
      accessor: 'score',
    },
    {
      Header: 'Due Date',
      accessor: 'due_date',
    },
    {
      Header: 'Assignee',
      accessor: 'assignee',
      Cell: ({ value }) => <CircularImageComponent />,
    },
    {
      Header: 'Priority',
      accessor: 'priority',
    },
    {
      Header: 'Tag',
      accessor: 'tag',
    },
  ];
  const rowsInTable = [
    {
      id: 1,
      account_name: 'Jhop Beer',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: 'High',
      due_date: '26 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 2,
      account_name: 'Soylent corp',
      account_id: '--',
      annual_revenue: '$1 - $10M',
      score: 'Medium',
      due_date: '03 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 3,
      account_name: 'Wakanda industries',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: 'Low',
      due_date: '05 Feb 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 4,
      account_name: 'Wayne Interpeises',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: '',
      due_date: '--',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 5,
      account_name: 'Nami',
      account_id: '--',
      annual_revenue: '$1 - $2M',
      score: '',
      due_date: '26 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 6,
      account_name: 'Bruce wayne',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: 'High',
      due_date: '26 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 7,
      account_name: 'Tony Stark',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: 'High',
      due_date: '26 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 8,
      account_name: 'Demon Slayer',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: 'High',
      due_date: '26 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
    {
      id: 9,
      account_name: 'Zoro',
      account_id: 'AB-123',
      annual_revenue: '$1 - $10M',
      score: 'High',
      due_date: '26 Jan 2023',
      assignee: [],
      priority: 'high',
      tag: 'recurring',
    },
  ];
  const newTaskClickedtable = false;
  const addNewRow = false;
  const initialData = {
    rowsInTable,
    newTaskClickedtable,
    columnsArray,
    addNewRow,
  };
  return initialData;
};

export const tableSlice = createSlice({
  name: 'table',
  initialState: generateInitialTableState(),
  reducers: {
    setNewTaskClickedtable: (state, action: PayloadAction<any>) => {
      state.newTaskClickedtable = action.payload;
    },
    setNewColumn: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.columnsArray.push(action.payload);
    },
    setColumnOrder: (state, action: PayloadAction<any>) => {
      const { source, destination } = action.payload;
      if (!destination) return;
      const newColumnOrder = Array.from(state.columnsArray);
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed);
      state.columnsArray = newColumnOrder;
    },
    setRowOrder: (state, action: PayloadAction<any>) => {
      const { source, destination } = action.payload;
      if (!destination) return;
      const newRowOrder = Array.from(state.rowsInTable);
      const [removed] = newRowOrder.splice(source.index, 1);
      newRowOrder.splice(destination.index, 0, removed);
      state.rowsInTable = newRowOrder;
    },
    setNewRow: (state, action: PayloadAction<any>) => {
      const newRowData = {};
      state.columnsArray.forEach((column) => {
        const { accessor } = column;
        newRowData[accessor] = action.payload[accessor] || null;
      });
      const newRowOrder = Array.from(state.rowsInTable);
      newRowOrder.push(newRowData);
      state.rowsInTable = newRowOrder;
    },
  },
});
export const {
  setNewTaskClickedtable,
  setNewColumn,
  setColumnOrder,
  setRowOrder,
  setNewRow,
} = tableSlice.actions;
export default tableSlice.reducer;