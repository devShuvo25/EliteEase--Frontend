// redux/api/categoryApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { Question } from "@/types/question";

export const questionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllquestions: builder.query<{ data: Question[] }, void>({
      query: () => "/questions",
      providesTags: ["questions"],
    }),

    getQuestionsById: builder.query<{ data: Question[] }, string>({
      query: (id) => `/questions/product/${id}`,
      providesTags: ["questions"],
    }),
    // create questions
    createQuestions: builder.mutation({
      query: ({ data }) => ({
        url: "/questions",
        method: "POST",
        body: data, // { name, description }
      }),
      invalidatesTags: ["questions"],
    }),
    // create answers
    createAnswer: builder.mutation({
      query: ({ data }) => ({
        url: `/${data?.questionId}/answers`,
        method: "POST",
        body: data, // { name, description }
      }),
      invalidatesTags: ["answers"],
    }),

    updateQuestions: builder.mutation({
      query: ({ data }) => ({
        url: `/questions/${data.id}`,
        method: "PATCH", // or "PUT" depending on your backend
        body: data, // { id, name, description }
      }),
      invalidatesTags: ["questions"],
    }),

    deleteQuestions: builder.mutation({
      query: ({ data }) => ({
        url: `/questions/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),
  }),
});

export const {
  useGetAllquestionsQuery,
  useGetQuestionsByIdQuery,
  useUpdateQuestionsMutation,
  useDeleteQuestionsMutation,
  useCreateAnswerMutation,
} = questionsApi;
