import { configureStore } from '@reduxjs/toolkit';
import { docsReducer } from './reducers';

export const store = configureStore({
  reducer: {
    docs: docsReducer,
  },
});
