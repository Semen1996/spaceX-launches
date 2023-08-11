import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSpaceX = createApi({
  reducerPath: 'apiSpaceX',
  baseQuery: fetchBaseQuery({baseUrl: 'https://api.spacexdata.com/v4'}),
  endpoints: build => ({
    getLaunches: build.query({
      query: () => ({
        url: '/launches/query',
        method: 'POST',
        body: {
            "query":{
              "success": true,
              "date_utc": {
                "$gte": "2015-01-01T00:00:00.000Z",
                "$lte": "2019-12-31T23:59:59.000Z"
              },
            },
            "options": {
              "limit": 1000,
              "sort": {
                "date_utc": -1, 
              }
            }
          }
      }),
    }),
    getRockets: build.query({
      query: () =>  '/rockets',
    }),
  })
});


export const { useGetLaunchesQuery, useGetRocketsQuery } = apiSpaceX;
