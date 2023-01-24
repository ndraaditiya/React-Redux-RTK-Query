import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://calm-plum-jaguar-tutu.cyclic.app/todos'
  }),
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: () => '/',
      providesTags: ['Todos'],
      transformResponse: (res) => res.data
    }),
    postTodo: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data
      }),
      // this invalidatesTags mean will re-run func getAllTodos, so after we modifying data, the data will be fresh or up to date
      invalidatesTags: ['Todos']
    }),
    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Todos']
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Todos']
    })
  })
})

// the use hook below is automaticlly created by reduk toolkit, you just can see the template
// useGetAllTodosQuery is for getAllTodos above, and usePostTodoMutation is for postTodo, etc.
export const {
  useGetAllTodosQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi