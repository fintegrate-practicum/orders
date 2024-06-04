import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../featurers/order/orderSlice.js';

const store = configureStore({
  reducer: {
    order:orderSlice,
  },
})
