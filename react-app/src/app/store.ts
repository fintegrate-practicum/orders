import {configureStore} from "@reduxjs/toolkit"
import apiSlice from './apiSlice'
import ordersApiSlice from '../orders/ordersApiSlice'
//import seminariesApiSlice from './features/seminaries/seminariesApiSlice';

const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
      
            getDefaultMiddleware().concat(apiSlice.middleware,ordersApiSlice.middleware),
            devTools:process.env.NODE_ENV!=='production',

            
});
export type RootState=ReturnType<typeof store.getState>;


export type AddDispatch=typeof store.dispatch;

export default store;


