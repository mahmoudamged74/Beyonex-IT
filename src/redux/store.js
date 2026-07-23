import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { projectApi } from './api/projectApi';
import './api/homeApi';
import './api/servicesApi';
import './api/settingsApi';
import './api/aboutApi';
import './api/contactApi';
import './api/partnersApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, projectApi.middleware),
});
