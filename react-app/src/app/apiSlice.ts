// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // יצירת ה-API הראשי
// const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:8787', // עדכן לכתובת ה-API שלך
//   }),
//   endpoints: () => ({}), // אנחנו נשתמש ב-injectEndpoints בקבצים ספציפיים
// });

// export default apiSlice;



// src/app/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// יצירת ה-API הראשי
const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8787', // ודא שזו הכתובת הנכונה ל-API שלך
  }),
  tagTypes: ['Orders', 'Users', 'Products'], // הגדרת tagTypes אם יש צורך
  endpoints: () => ({}), // אנחנו נשתמש ב-injectEndpoints בקבצים ספציפיים
});

export default apiSlice;
