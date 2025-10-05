import { configureStore } from "@reduxjs/toolkit";
import { RegisterReducer } from "../features";
import dataReducer from "../features/register/dataslice";

export const store = configureStore({
  reducer: {
    register: RegisterReducer,
    data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
