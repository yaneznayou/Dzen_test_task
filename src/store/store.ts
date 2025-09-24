import { configureStore } from '@reduxjs/toolkit'
import { appReducer } from './slices/appSlice'
import { filterReducer } from './slices/appSlice'
import { modalReducer } from './slices/appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
